import { Button } from "@/components/ui/button";
import { UrlCard } from "./_components/url-cards";
import { getSelf } from "@/lib/authservice";
import { getStreamByUserId } from "@/lib/stream-service";

const KeySettings = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id); 

    if(!stream) {
        throw new Error("Stream not found")
    }

    return (  
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Key Settings
                </h1>
                <Button variant="primary">
                    Generate
                </Button>
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.serverUrl}/>
            </div>
        </div>
    );
}
 
export default KeySettings;