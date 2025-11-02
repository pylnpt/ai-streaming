"use client"
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
    Fullscreen,
    KeyRound,
    MessageSquare,
    Users,
    MessageSquareX
} from "lucide-react";
import { NavItem, NavItemSkeleton } from "./navitem";

export const Navigation = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen
        },
        {
            label: "Stream Keys",
            href: `/u/${user?.username}/streamkeys`,
            icon: KeyRound  
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare  
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users
        },
        {
            label: "Content Filter",
            href: `/u/${user?.username}/aifilter`,
            icon: MessageSquareX
        }
    ];


    if(!user?.username) {
        return (
            <ul className="space-y-2">
                {[...Array(6)].map((_,i) => (
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }

    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route, i) => (
                <NavItem href={route.href}
                    label={route.label}
                    icon={route.icon}
                    isActive={pathname === route.href}
                    key={i}
                    />
            ))}
        </ul>
    )
}