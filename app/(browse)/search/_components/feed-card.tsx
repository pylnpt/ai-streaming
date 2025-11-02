import { User } from "@prisma/client"
import Link from "next/link"
import { Thumbnail, ThumbNailSkeleton } from "../../_components/thumbnail"
import { VerifiedBadge } from "@/components/verified"
import { formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"

interface FeedCardProps {
    data: {
        name: string;
        id: string;
        thumbnailUrl: string | null;
        isStreaming: boolean;
        updatedAt: Date;
        user : User;
    } 
    
}

export const FeedCard = ({
    data
}: FeedCardProps) => { 
    return(
        <Link href={`/${data.user.username}`}>
            <div className=" w-full flex gap-x-4">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail 
                        src={data.thumbnailUrl}
                        fallback={data.user.image}
                        isStreaming={data.isStreaming}
                        username={data.name}
                        />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-primary">{data.user.username}</p>
                        <VerifiedBadge/>
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true
                        })}    
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const FeedCardSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbNailSkeleton />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-3 w-24"/>
                <Skeleton className="h-3 w-12"/>
            </div>
        </div>
    )   
}