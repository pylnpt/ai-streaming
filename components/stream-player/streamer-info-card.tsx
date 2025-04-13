"use client";

import { VerifiedBadge } from "../verified";
import { BioModal } from "./bio-modal";

interface StreamerInfoCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string ;
    followedByNum: number;
}

export const StreamerInfoCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByNum,
}: StreamerInfoCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;
    const followedByLabel = followedByNum === 1 ? "follower" : "followers";
      
    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3 border-2 border-primary">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About {hostName}
                        <VerifiedBadge/>
                    </div>
                    {isHost && (
                        <BioModal initialValue={bio}/>
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{followedByNum}</span> {followedByLabel}
                </div>
                <p className="text-sm"> { bio || "Thousands upon thousands might be revealed, yet there would always be more that remained hidden. Such as this Users bio. Sad honestly." }</p>
            </div>
        </div>
      );
}