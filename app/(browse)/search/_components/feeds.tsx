import { search } from "@/lib/search-service";
import { FeedCard, FeedCardSkeleton } from "./feed-card";
import { Skeleton } from "@/components/ui/skeleton";

interface FeedsProps {
    term?: string;
};

export const Feeds = async ({
    term
}: FeedsProps) => {
    const data = await search(term);

    return(
        <div>
            <h2 className="text-lg font-semibold mb-4">Your results for: {term}</h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    There is no result for {term}. Try something else. 
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((feed) => (
                    <FeedCard 
                        data={feed} 
                        key={feed.id}/>
                ))}
            </div>
        </div>
    )
}

export const FeedsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4"/>
            <div className="flex flex-col gap-y-4">
                {[...Array(5)].map((_, i) => (
                    <FeedCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}