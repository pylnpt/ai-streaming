"use client"

import {cn} from "@/lib/utils";
import { useSettingsSideBar } from "@/store/use-settings-sidebar";

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({
    children,
}: WrapperProps) => {
    const { collapsed } = useSettingsSideBar((state) => state)


    return (
        <aside className={cn(
            "fixed right-0 flex flex-col w-60 h-full bg-background border border-primary z-50",
            collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}