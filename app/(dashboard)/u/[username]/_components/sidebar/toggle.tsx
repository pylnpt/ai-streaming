"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsSideBar } from "@/store/use-settings-sidebar";
import { ChevronsRight , ChevronsLeft  } from "lucide-react";

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSettingsSideBar((state) => state);

    const label = collapsed ? "Expand" : "Collapse"
    return (
        <>
        {collapsed && (
            <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
                <Hint label={label} side="right" asChild>
                    <Button onClick={onExpand}
                        variant="ghost"
                        className="h-12 w-12  border-2 border-primary">
                            <ChevronsLeft className="h-4 w-4"/>
                    </Button>
                </Hint>
            </div>
        )}
        {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full border border-primary">
            <p className="font-semibold text-primary">
                Settings
            </p>
            <Hint label={label} side="right" asChild>
                <Button onClick={onCollapse}
                    variant="ghost"
                    className="h-auto p-2 ml-auto border-2 border-primary">
                        <ChevronsRight className="h-4 w-4"/>
                </Button>
            </Hint>
        </div>
        )}
        </>
      );
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]"/>
            <Skeleton className="h-6"/>
        </div>
    )
}