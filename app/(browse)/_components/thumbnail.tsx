import { LiveBadge } from "@/components/ui/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import Image from "next/image";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isStreaming: boolean
    username: string;
}

export const Thumbnail = ({
    src,
    fallback,
    isStreaming,
    username
} :ThumbnailProps) => {
    let content;
    if(!src) {
        content = (
            <div className="bg-background flex flex-col items-center justify justify-center 
                gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 
                group-hover:-translate-y-2 rounded-md">
                    <UserAvatar showBadge
                        size="lg"
                        username={username}
                        imageUrl={fallback}
                        isStreaming={isStreaming} />
            </div>
        )
    } else {
        content = (
            <Image src={src}
                fill
                alt="Thumbnail"
                className="object-cover transition-transform group-hover:translate-x-2
                    group-hover:-transalte-y-2 rounded-md"/>
        )
    }

    return (
        <div className="group aspect-video relative rounded-md cursor-pointer">
            <div className="rounded-md absolute inset-0 bg-primary opacity-0 group-hover:opacity-100
                transition-opacity flex items-center justify-center" />
                 {content}
                 {isStreaming && (
                        <div className="absolute top-2 left-2 group-hover: translate-x-2 group-hover:-translate-y-2 transition-transform">
                            <LiveBadge/>
                        </div>
                    )}
        </div>
    )
}

export const ThumbNailSkeleton = () => {
    return (
        <div className="group aspect-video relative-rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}