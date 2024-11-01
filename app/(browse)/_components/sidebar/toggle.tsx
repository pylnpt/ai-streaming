"use client"
 
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSideBar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
        {collapsed && (
            <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                <Hint label={label} side="right" asChild>
                    <Button variant="ghost" className="h-auto p-2 border-2 border-primary" onClick={onExpand}>
                        <ArrowRightFromLine className="h-4 w-4 text-primary"/>
                    </Button>
                </Hint>                
            </div>
        )}
        {!collapsed && (
            <div className="p-3 pl-6 mb-2 flex items-center w-full border border-primary">
                <p className="font-semibold text-foreground">For you</p>
                <Hint label={label} side="right" asChild>
                    <Button onClick={onCollapse}
                        className="h-auto p-2 ml-auto border-2 border-primary"
                        variant="ghost">
                        <ArrowLeftFromLine className="h-4 w-4"/> 
                    </Button>
                </Hint>
            </div>
        )}
        </>
        );
}
 
export default Toggle;

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]"/>
            <Skeleton className="h-6"/>
        </div>
    )
}