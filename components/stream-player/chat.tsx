"use client";

import { useChatSideBar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";

interface ChatProps {
    hostName: string;
    hostidentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const Chat = ({
    hostName,
    hostidentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
} : ChatProps) => {
    const matches = useMediaQuery('(max-width: 1024px)');
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostidentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    const {
        type,
        onExpand
    } = useChatSideBar((state) => state)


    useEffect(() => {
        if(matches) { onExpand() }
    }, [matches, onExpand]);
    
    const reversedMessages =  useMemo(() => {
        return messages.sort((a,b) => b.timestamp - a.timestamp)
    }, [messages]);

    const onSubmit = () => {
        if(!send) return;
        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            chat lol
        </div>
    )
}