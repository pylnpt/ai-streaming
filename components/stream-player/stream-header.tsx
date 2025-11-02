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
    image: string;
    isFollowing: boolean
    name: string
}

export const StreamHeader = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    image,
    isFollowing,
    name,
}: StreamHeaderProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    const participants = useParticipants();
    // Use the correct host identity (host-${hostIdentity})
    const participant = useRemoteParticipant(hostAsViewer);

    const isStreaming = !!participant;

    // Filter out the host from participant count (both as streamer and viewer)
    // Host can be present as "host-${id}" (streaming) AND "${id}" (viewing own stream in another tab)
    const participantCount = participants.filter(
        (p) => p.identity !== hostAsViewer && p.identity !== hostIdentity
    ).length;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    image={image}
                    username={hostName}
                    size="lg"
                    isStreaming={isStreaming}
                    showBadge={isHost}/>
           
            <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                    <h2 className="text-lg font-semibold">{hostName}</h2>
                    <VerifiedBadge />
                </div>
                <p className="text-sm font-semibold">
                    {name}
                </p>
                { isStreaming ? (
                    <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
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