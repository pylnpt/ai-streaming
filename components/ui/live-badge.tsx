import { cn } from "@/lib/utils";

interface LiveBadgeProps {
    className?: string;
}

export const LiveBadge = ({
    className,
}: LiveBadgeProps) => {
    return (
        <div className={cn(
            "bg-primary text-center text-background",
             "p-0.5 px-1.5 rounded-md uppercase",
             " text-[10px] border border-background font font-semibold tracking-wide",
             className
        )}>
            Streaming
        </div>
    )
}