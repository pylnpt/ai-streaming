"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react" 
import { Video, VideoSkeleton } from "./video";
import { useChatSideBar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { StreamHeader, StreamHeaderSkeleton } from "./stream-header";
import { StreamInfoCard } from "./stream-info";
import { StreamerInfoCard } from "./streamer-info-card";
import { NonSensitiveUserDataType, SecureStreamType } from "@/lib/types";

interface StreamPlayerProps {
    user: NonSensitiveUserDataType 
    stream: SecureStreamType,
    isFollowing: boolean;
    threshold: number;
    filters: string[];
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
    threshold,
    filters
}: StreamPlayerProps) => {
    const {
        token,
        name,
        identity
    } = useViewerToken(user.id);

    const {
        collapsed
    } = useChatSideBar((state) => state);
    
    if(!token || !name || !identity ) {
        return <StreamPlayerSkeleton /> 
    }

    return (
        <>
        {collapsed && (
            <div className="hidden lg:block fixed top-[100px] left-2 z-50">
                <ChatToggle/>
            </div>
        )}
           <LiveKitRoom 
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
                >
                    <div className={cn(
                        "col-span-1",
                        collapsed && "hidden"
                    )}>
                        <Chat viewerName={name}
                            hostName={user.username}
                            hostidentity={user.id}
                            isFollowing = {isFollowing}
                            isChatEnabled = {stream.isChatEnabled}
                            isChatDelayed = {stream.isChatDelayed}
                            isChatFollowersOnly = {stream.isChatFollowersOnly} 
                            user={user}
                            filters={filters}
                            threshold={threshold}/>
                    </div>
                    <div className="space-y-4 col-span-1 lg:col-span-2 
                        xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                        <Video hostName={user.username} 
                            hostIdentity={user.id}/>
                        <StreamHeader
                            hostName={user.username}
                            hostIdentity={user.id}
                            viewerIdentity={identity}
                            imageUrl={user.imageUrl}
                            isFollowing={isFollowing}
                            name={stream.name}
                            />
                        <StreamInfoCard 
                            hostIdentity={user.id}
                            viewerIdentity={identity}
                            thumbNailUrl={user.stream?.thumbnailUrl}
                            name={stream.name}
                        />
                        <StreamerInfoCard
                            hostName={user.username}
                            hostIdentity={user.id}
                            viewerIdentity={identity}
                            bio={user.bio}
                            followedByNum={user._count.follow}
                        />

                    </div>
                    
            </LiveKitRoom>
        </>   
        )
}

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="col-span-1 bg-background">
                <ChatSkeleton/>
            </div>
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <StreamHeaderSkeleton />
            </div>
        </div>
    )
}