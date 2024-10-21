"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSideBar } from "@/store/use-sidebar";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";

interface UserItemProps {
    username: string;
    imageUrl: string;
    isStreaming?: boolean;
}
export const UserItem = ({
    username,
    imageUrl,
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
                    <UserAvatar imageUrl={imageUrl}
                        username={username}
                        isStreaming={isStreaming}
                        showBadge/>
                </div>
            </Link>
        </Button>
    )
}