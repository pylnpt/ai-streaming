"use client"

import { ChevronsRight, ChevronsLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useChatSideBar } from "@/store/use-chat-sidebar";
import { Hint } from "../hint";

export const ChatToggle = () => {
    const {
        collapsed,
        onCollapse,
        onExpand
    } = useChatSideBar((state) => state)

    const Icon = collapsed ? ChevronsRight : ChevronsLeft;
    
    const onToggle = () => {
        if(collapsed){ onExpand() }
        else { onCollapse() }
    }

    const label = collapsed ? "Expand" : "Collapse";
    return (
        <Hint label={label}
            side="left"
            asChild>
            <Button onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent">
                    <Icon className="h-4 w-4" />
                </Button>
        </Hint>
    ) 
}