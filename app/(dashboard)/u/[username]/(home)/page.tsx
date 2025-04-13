import { StreamPlayer } from "@/components/stream-player";
import { getFilterValuesByUserId, getThresholdByUserId } from "@/lib/profanity-service";
import { getUserByUserName } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps {
    params: {
        username: string;
    };
}

const CreatorPage = async({
    params
}: CreatorPageProps) => {
    const currUser = await currentUser();
    const user = await getUserByUserName(params.username);
    const threshold = await getThresholdByUserId(user!.id);
    console.log(user);
    const toxicityLabels = await getFilterValuesByUserId(user!.id);


    if(!user || user.externalUserId !== currUser?.id || !user.stream) {
        throw new Error("Unauthorized")
    }
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
              threshold={Number(threshold!.value ?? 0)}
              filters={toxicityLabels}
            />
    )}

    </div> );
}
 
export default CreatorPage;