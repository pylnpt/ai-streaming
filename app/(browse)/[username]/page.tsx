import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

import { notFound } from "next/navigation";
import { getFilterValuesByUserId, getThresholdByUserId } from "@/lib/profanity-service";
import { getWhitelistByUserId, getBlacklistByUserId } from "@/lib/custom-words-service";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserName(params.username);
    if(!user || !user.stream) { throw notFound() }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    const threshold = await getThresholdByUserId(user.id);
    const toxicityLabels = await getFilterValuesByUserId(user.id);
    const whitelist = await getWhitelistByUserId(user.id);
    const blacklist = await getBlacklistByUserId(user.id);

    if(isBlocked) { throw notFound() }

    return (
        <StreamPlayer    user={{
            ...user,
            bio: user.bio ?? "",
            stream: user.stream
              ? {
                  ...user.stream,
                  thumbnailUrl: user.stream.thumbnailUrl ?? "", // ← 🧼 sanitize
                }
              : null,
          }}
          stream={{
            ...user.stream,
            thumbnailUrl: user.stream.thumbnailUrl ?? "",
          }}
            isFollowing={isFollowing}
            threshold={Number(threshold?.value)}
            filters={toxicityLabels}
            whitelist={whitelist}
            blacklist={blacklist}/>
        )   
}
 
export default UserPage;