"use client"

import { MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useChatSideBar, ChatType } from "@/store/use-chat-sidebar";
import { Hint } from "../hint";

export const ChatTypeToggle = () => {
    const {
        type,
        onChangeChatType
    } = useChatSideBar((state) => state)

    const Icon = type === ChatType.CHAT ? Users : MessageSquare;
    const isChat = type === ChatType.CHAT;

    const onToggle = () => {
        const newType = isChat ? ChatType.COMMUNITY : ChatType.CHAT;
        onChangeChatType(newType);
    }

    const label = isChat ? "Community" : "Go Back to Chat";
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