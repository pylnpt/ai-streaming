"use client";

interface StreamerInfoCardProps {
    hostName: string;
    hostidentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByNum: number;
}

export const StreamerInfoCard = ({
    hostName,
    hostidentity,
    viewerIdentity,
    bio,
    followedByNum,
}: StreamerInfoCardProps) => {
    return (
        <div>
            StreamerInfoCard
        </div>
      );
}