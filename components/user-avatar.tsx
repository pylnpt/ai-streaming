import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import { LiveBadge } from "./ui/live-badge";

interface UserAvatarProps extends VariantProps<typeof avatarSizes>{
    imageUrl:string,
    username: string,
    isStreaming?:boolean,
    showBadge?:boolean,
}

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14" 
            },
        },
        defaultVariants: {
            size :"default"
        },
    },
)

export const UserAvatar = ({
    imageUrl,
    username,
    isStreaming,
    showBadge,
    size
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isStreaming;
    return(
        <div className="relative">
            <Avatar className={cn(
                isStreaming && "ring-2 ring-green-300 border border-background",
                avatarSizes({ size })
            )}>
                <AvatarImage src={imageUrl} className="object-cover"/>
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}       
        </div>
    );
}

export const UserAvartarSkeleton = ({
    size,
}: VariantProps<typeof avatarSizes>) => {
    return (
        <Skeleton className={cn(
            "rounded-full",
            avatarSizes({size})
        )}/>
    )
}
