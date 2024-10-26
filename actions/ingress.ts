"use-server";

import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    TrackSource,
    CreateIngressOptions,
    IngressVideoOptions,
    IngressAudioOptions
} from "livekit-server-sdk";

// import {  } from "livekit-server-sdk/dist/proto/livekit_models"; 

import { db } from "@/lib/db";
import { getSelf } from "@/lib/authservice";
import { revalidatePath } from "next/cache";

const roomservice = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async(hostIdentity: string) => {
    const ingressArray = await ingressClient.listIngress({
        roomName: hostIdentity
    })

    const roomArray = await roomservice.listRooms([hostIdentity]);
    for(const room of roomArray) {
        await roomservice.deleteRoom(room.name);
    }

    for(const ingress of ingressArray) {
        await ingressClient.deleteIngress(ingress.ingressId);
    }
} 

export const createIngress = async(ingressType: IngressInput) => {
    const self = await getSelf();
    
    await resetIngresses(self.id)
    
    const options : CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id,
        enableTranscoding: true,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.enableTranscoding = false;
    } else {
        options.video = new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
              },
        })
        
        options.audio = new IngressAudioOptions({
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
              },
        }); 
            
    };
    const ingress = await ingressClient.createIngress(ingressType, options);

    if(!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed ingress creation");
    }

    await db.stream.update({
        where: {
            userId: self.id
        },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey
        }
    })

    revalidatePath(`/u/${self.username}/keys`);
    return ingress;
}