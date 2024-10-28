"use client"

import { ConnectionState, Track } from "livekit-client";
import { 
    useConnectionState,
    useTracks,
    useRemoteParticipant,
} from "@livekit/components-react"
import { Offline } from "./offline";
import { Loading } from "./loading-video";
import { Live } from "./live";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: string,
}

export const Video = ({
    hostName,
    hostIdentity    
}: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks ([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if(!participant && connectionState === ConnectionState.Connected){
        content = <Offline username={hostName}/>
    } else if(!participant ||tracks.length === 0){
        content = <Loading label={connectionState}/>
    } else {
        content = <Live participant={participant}/>
    }

    return (
        <div className=" aspect-video border-b groups relative">
            {content}
        </div>
    )
}

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none"/> 
        </div>
    );
}