import { getStreams } from "@/lib/feed-service"
import { FeedCard, FeedCardSkeleton } from "./feed-card";
import { Skeleton } from "@/components/ui/skeleton";

export const Feeds = async () => {
    const data = await getStreams();
    
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">User Feeds</h2>
            { data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    There is no one there but crickets. Be the one who changes that.
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data.map((stream) => (
                    <div key={stream.id}>
                        <FeedCard 
                            key={stream.id}
                            data={stream} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export const FeedsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[...Array(20)].map((_, i) => (
                    <FeedCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )   
}