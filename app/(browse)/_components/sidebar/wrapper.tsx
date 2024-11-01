"use client"

import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { useIsClient } from "usehooks-ts";
import { RecommendedSkeleton } from "./recomended";
import { FollowedSkeleton } from "./followed";

interface WrapperProps {
    children: React.ReactNode
};

const Wrapper = ({
    children,
} : WrapperProps) => {

    const isClient = useIsClient();
    const { collapsed } = useSideBar((state) => state);


    if(!isClient) {
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton/>
            <FollowedSkeleton />
            <RecommendedSkeleton/>
        </aside>
    }

    return (
    <>
        <aside className={cn(
            "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "w-[70px]")}>
            {children}
        </aside>
    </>
    );
}
 
export default Wrapper;