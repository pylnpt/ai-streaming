import { getStreams } from "@/lib/feed-service"
import { User, Stream } from "@prisma/client";
import Link from "next/link";
import { Thumbnail, ThumbNailSkeleton } from "../../_components/thumbnail";
import { LiveBadge } from "@/components/ui/live-badge";
import { UserAvartarSkeleton, UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface FeedCardProps {
    data: {
        user: User;
        thumbnailUrl: string | null;
        name: string;
        isStreaming: boolean,
    }
} 

export const FeedCard = async ({
    data
}: FeedCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail 
                    src={data.thumbnailUrl}
                    fallback={data.user.imageUrl}
                    isStreaming={data.isStreaming}
                    username={data.user.username}
                    />
                    
                    <div className="flex-gap-x-3">
                        <UserAvatar username={data.user.username}
                            imageUrl={data.user.imageUrl}
                            isStreaming={data.isStreaming}/>
                    </div>
                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font semibold hover:text-primary">{data.name}</p>
                        <p className="text-muted-foreground">{data.user.username}</p>
                    </div>
            </div>
        </Link>
    )
}

export const FeedCardSkeleton = () => {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbNailSkeleton />
            <div className="flex gap-x-3">
                <UserAvartarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32"/>
                    <Skeleton className="h-3 w-24"/>
                </div>
            </div>
        </div>
    )   
}