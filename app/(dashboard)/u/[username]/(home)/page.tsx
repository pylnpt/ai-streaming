import { StreamPlayer } from "@/components/stream-player";
import { getFilterValuesByUserId, getThresholdByUserId } from "@/lib/profanity-service";
import { getWhitelistByUserId, getBlacklistByUserId } from "@/lib/custom-words-service";
import { getUserByUserName } from "@/lib/user-service";
import { auth } from "@/auth";

interface CreatorPageProps {
    params: {
        username: string;
    };
}

const CreatorPage = async({
    params
}: CreatorPageProps) => {
    const session = await auth();
    const currUser = session?.user;

    const user = await getUserByUserName(params.username);

    if(!user) {
        throw new Error("User not found for username: " + params.username)
    }

    const threshold = await getThresholdByUserId(user.id);
    const toxicityLabels = await getFilterValuesByUserId(user.id);
    const whitelist = await getWhitelistByUserId(user.id);
    const blacklist = await getBlacklistByUserId(user.id);

    if(user.id !== currUser?.id || !user.stream) {
        throw new Error(`Unauthorized: user.id=${user.id}, currUser.id=${currUser?.id}, hasStream=${!!user.stream}`)
    }

    // Default threshold if none is set (90% = 0.9)
    const thresholdValue = threshold?.value ? Number(threshold.value) : 0.9;

    const cleanedUser = {
        ...user,
        bio: user.bio ?? "", // Fix bio

        stream: user.stream
          ? {
              ...user.stream,
              thumbnailUrl: user.stream.thumbnailUrl ?? "", // Fix stream.thumbnailUrl
            }
          : null,
      };

    return (
    <div className="h-full">
        {cleanedUser.stream && (
            <StreamPlayer
              user={cleanedUser}
              stream={cleanedUser.stream}
              isFollowing
              threshold={thresholdValue}
              filters={toxicityLabels}
              whitelist={whitelist}
              blacklist={blacklist}
            />
    )}

    </div> );
}
 
export default CreatorPage;