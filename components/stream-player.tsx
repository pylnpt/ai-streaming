"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { User, Stream } from "@prisma/client"

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {
    const {
        token,
        name,
        identity
    } = useViewerToken(user.id);
    
    if(!token || !name || !identity ) {
        return (
            <div>
                You can not watch this stream
            </div>
        )
    }

    return (
    <div>
        Allowed to watch this Stream
    </div>)
}