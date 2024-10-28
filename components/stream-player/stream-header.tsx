"use-client"

import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserAvartarSkeleton, UserAvatar } from "../user-avatar";
import { VerifiedBadge } from "../verified";
import { UserIcon } from "lucide-react";
import { Actions, ActionSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface StreamHeaderProps {
    hostName: string;
    hostIdentity: string
    viewerIdentity: string;
    imageUrl: string;
    isFollowing: boolean
    name: string
}

export const StreamHeader = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    imageUrl,
    isFollowing,
    name,
}: StreamHeaderProps) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isStreaming = !!participant;
    const participantCount = participants.length - 1;
    
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar 
                    imageUrl={imageUrl} 
                    username={hostName}
                    size="lg"
                    isStreaming={isStreaming}
                    showBadge/>
           
            <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                    <h2 className="text-lg font-semibold">{hostName}</h2>
                    <VerifiedBadge />
                </div>
                <p className="text-sm font-semibold">
                    {name}
                </p>
                { isStreaming ? (
                    <div className="fosnt-semibold flex gap-x-1 items-center text-xs text-rose-500">
                        <UserIcon  className="h-4 w-4"/>
                        <p>
                            {participantCount} {participantCount === 1 ? "Viewer" : "Viewers"}
                        </p>
                    </div>
                ) : (
                    <p className="font-semibold text-xs text-muted-foreground">Offline</p>
                )}
            </div>
        </div>
        <Actions 
            isFollowing={isFollowing}
            hostIdentity={hostIdentity}
            isHost={isHost}/>

    </div>
    )
}

export const StreamHeaderSkeleton = () => {
    return  (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-2">
                <UserAvartarSkeleton size="lg"/>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32"/>
                    <Skeleton className="h-4 w-24"/>
                </div>
            </div>
            <ActionSkeleton/>
        </div>
    )
}