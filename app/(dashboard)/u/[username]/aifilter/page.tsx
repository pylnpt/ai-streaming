
import { getSelf } from "@/lib/authservice";
import { AIToggleCard } from "./_components/ai-toggle-card";
import { 
    getEveryFilter, 
    getEveryThreshold, 
    getFiltersByUserId, 
    getThresholdByUserId 
} from "@/lib/profanity-service";
import { AIFilterSelectCard } from "./_components/ai-fillter-select.-card";
import { AIThresholdSelectCard } from "./_components/ai-threshold-select-card";

const ProfanityFilterSettings = async () => {
    const self = await getSelf();
    const userFilters = await getFiltersByUserId(self.id);
    const everyFilter = await getEveryFilter();

    const selectedThreshold = await getThresholdByUserId(self.id);
    const everyThreshold = await getEveryThreshold();
    const hasAnyFilterSelected = userFilters?.length === 0 ? false : true;

    return (  
        <div className="p-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Profanity Filter Settings
                </h1>
            </div>
            <div className="space-y-20">
                <AIToggleCard value={self.isUsingProfanityFilter}
                    user={self} 
                    hasAnyFilterSelected={hasAnyFilterSelected}/>
                <div className="sm:space-y-20
                    lg:space-y-0 
                    lg:flex
                    lg:space-x-40
                    lg:items-center
                    lg:justify-center">
                    <AIFilterSelectCard
                        everyFilter={everyFilter}
                        activeFilters={userFilters} 
                        user={self}
                        />
                    <AIThresholdSelectCard
                        userId={self.id}
                        userThreshold={JSON.parse(JSON.stringify(selectedThreshold))}
                        everyThreshold={everyThreshold}
                      />
                </div>
            </div>
            
        </div>
    );
}
 
export default ProfanityFilterSettings;