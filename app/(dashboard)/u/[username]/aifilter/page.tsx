
import { getSelf } from "@/lib/authservice";
import { AIToggleCard } from "./_components/ai-toggle-card";
import { getEveryFilter, getFiltersByUserId } from "@/lib/profanity-service";
import { AIFilterSelectCard } from "./_components/ai-fillter-select.-card";

const ProfanityFilterSettings = async () => {
    const self = await getSelf();
    const userFilters = await getFiltersByUserId(self.id);
    const everyFilter = await getEveryFilter();

    return (  
        <div className="p-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Profanity Filter Settings
                </h1>
            </div>
            <div className="space-y-20">
            <AIToggleCard
                value={false}
            />
            <AIFilterSelectCard  
                everyFilter={everyFilter}
                activeFilters={userFilters} 
                userId={self.id}/>
            </div>
        </div>
    );
}
 
export default ProfanityFilterSettings;