import { getSelf } from "@/lib/authservice";
import { CameraCard } from "./_components/camera-card";
import { ToggleEyeTracking } from "../chat/_components/toggle-eyetracking-card";
import { getStreamByUserId } from "@/lib/stream-service";

const EyeTrackingSettings = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);
    
    if(!stream) {
        throw new Error("Stream not found")
    }

    return (  
        //TODO:
        // FRONTE: 
        // - a dialog that opens a full screen modal to calibrate the ai

        // BACKEND: 
        // -the whole funtionality to use this


        <div className="p-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Eye Tracking Settings
                </h1>
                
            </div>
            <div className="space-y-10">
                <ToggleEyeTracking value={stream.eyeIsTracked}/>
                <CameraCard />
            </div>
        </div>
    );
}
 
export default EyeTrackingSettings;