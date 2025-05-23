"use client";

import { ChatType, useChatSideBar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";
import { NonSensitiveUserDataType } from "@/lib/types";

interface ChatProps {
    hostName: string;
    hostidentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    user: NonSensitiveUserDataType,
    threshold: number,
    filters: string[]
}

export const Chat = ({
    hostName,
    hostidentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
    user,
    threshold,
    filters
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
        <div className="flex flex-col bg-background
            border border-primary pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {type === ChatType.CHAT && (
                <>
                    <ChatList 
                        messages={reversedMessages}
                        isHidden={isHidden} 
                        threshold={threshold}
                        toxicityLabels={filters}
                        isUsingProfanityFilter={user.isUsingProfanityFilter}/>
                    <ChatForm 
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                        />
                </>
            )}
            {type === ChatType.COMMUNITY && (
                <ChatCommunity 
                    viewerName={viewerName}
                    hostName={hostName}
                    isHidden={isHidden} />
            )}
        </div>
    )
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col pt-0 h-[calc(100vh-80px)] border-2 border-primary">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>)
}