"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSideBar } from "@/store/use-sidebar";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/ui/live-badge";

interface UserItemProps {
    username: string;
    image: string;
    isStreaming?: boolean;
}
export const UserItem = ({
    username,
    image,
    isStreaming
}: UserItemProps) => {
    const pathName = usePathname();
    const {collapsed} = useSideBar((state) => state);
    const href = `/${username}`;
    const isActive = pathName === href;

    return (
        <Button asChild
        variant="ghost"
        className={cn(
            "w-full h-12",
            collapsed ? "justify-center" : "justify-start",
            isActive && "bg-accent"
        )}>
            <Link href={href}>
                <div className={cn(
                    "flex items-center w-full gap-x-4",
                    collapsed && "justify-center"
                )}>
                    <UserAvatar
                        image={image}
                        username={username}
                        isStreaming={isStreaming}
                        showBadge
                        />
                        {!collapsed && (
                            <p className="truncate">{username}</p>
                        )}
                        {!collapsed && isStreaming && (
                           <LiveBadge className="ml-auto"/>
                        )}
                </div>
            </Link>
        </Button>
    )
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full"/>
            <div className="flex-1">
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}