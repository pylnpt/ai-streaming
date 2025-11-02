
import { getSelf } from "@/lib/authservice";
import { AIToggleCard } from "./_components/ai-toggle-card";
import {
    getEveryFilter,
    getEveryThreshold,
    getFiltersByUserId,
    getThresholdByUserId,
    getFilterValuesByUserId
} from "@/lib/profanity-service";
import { getFilterStatistics } from "@/lib/filtered-messages-service";
import { getCustomWordsByUserId } from "@/lib/custom-words-service";
import { AIFilterSelectCard } from "./_components/ai-fillter-select.-card";
import { AIThresholdSelectCard } from "./_components/ai-threshold-select-card";
import { AITestMessageCard } from "./_components/ai-test-message-card";
import { AIStatisticsCard } from "./_components/ai-statistics-card";
import { AICustomWordsCard } from "./_components/ai-custom-words-card";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import Link from "next/link";

const ProfanityFilterSettings = async () => {
    const self = await getSelf();
    const userFilters = await getFiltersByUserId(self.id);
    const everyFilter = await getEveryFilter();

    const selectedThreshold = await getThresholdByUserId(self.id);
    const everyThreshold = await getEveryThreshold();
    const hasAnyFilterSelected = userFilters?.length === 0 ? false : true;

    const thresholdValue = selectedThreshold?.value ? Number(selectedThreshold.value) : 0.9;
    const toxicityLabels = await getFilterValuesByUserId(self.id);
    const statistics = await getFilterStatistics(self.id, 7);
    const customWords = await getCustomWordsByUserId(self.id);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Chat Content Filter
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Automatically filter inappropriate messages in your stream chat
                    </p>
                </div>
                {hasAnyFilterSelected && (
                    <Link href={`/u/${self.username}/aifilter/logs`}>
                        <Button variant="outline">
                            <History className="h-4 w-4 mr-2" />
                            View Filtered Messages
                        </Button>
                    </Link>
                )}
            </div>
            <div className="space-y-8">
                <AIToggleCard value={self.isUsingProfanityFilter}
                    user={self}
                    hasAnyFilterSelected={hasAnyFilterSelected}/>

                {/* Test Message and Statistics */}
                {hasAnyFilterSelected && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AITestMessageCard
                            threshold={thresholdValue}
                            toxicityLabels={toxicityLabels}
                        />
                        <AIStatisticsCard stats={statistics} />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                {/* Custom Words Management */}
                {hasAnyFilterSelected && (
                    <AICustomWordsCard userId={self.id} customWords={customWords} />
                )}
            </div>

        </div>
    );
}
 
export default ProfanityFilterSettings;