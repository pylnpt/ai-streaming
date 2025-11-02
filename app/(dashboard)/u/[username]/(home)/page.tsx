import { StreamPlayer } from "@/components/stream-player";
import { getFilterValuesByUserId, getThresholdByUserId } from "@/lib/profanity-service";
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
    console.log("🔍 Session user:", {
        id: currUser?.id,
        username: currUser?.username,
        email: currUser?.email,
    });
    console.log("🔍 Looking for username:", params.username);

    const user = await getUserByUserName(params.username);
    console.log("🔍 Found user:", user ? {
        id: user.id,
        username: user.username,
        email: user.email,
    } : "NOT FOUND");

    if(!user) {
        throw new Error("User not found for username: " + params.username)
    }

    const threshold = await getThresholdByUserId(user.id);
    const toxicityLabels = await getFilterValuesByUserId(user.id);

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
            />
    )}

    </div> );
}
 
export default CreatorPage;