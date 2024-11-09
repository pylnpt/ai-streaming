
import { getSelf } from "@/lib/authservice";
import { getStreamByUserId } from "@/lib/stream-service";
import { AISettingsCard } from "./_components/ai-settings-card";

const ProfanityFilterSettings = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id); 

    if(!stream) {
        throw new Error("Stream not found")
    }

    return (  
        <div className="p-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Profanity Filter Settings
                </h1>
            </div>
            <div className="space-y-20">
            <AISettingsCard selectPickerChoices={["choice one", "choice two", "choice three"]}  value={false}/>
                {/* <UrlCard value={stream.serverUrl}/>
                <KeyCard value={stream.streamKey}/> */}
            </div>
        </div>
    );
}
 
export default ProfanityFilterSettings;