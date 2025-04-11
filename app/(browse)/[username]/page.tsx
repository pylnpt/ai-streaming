import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

import { notFound } from "next/navigation";
import { getFilterValuesByUserId, getThresholdByUserId } from "@/lib/profanity-service";

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

    if(isBlocked) { throw notFound() }
    
    return ( 
        <StreamPlayer user={user}
            stream={user.stream}    
            isFollowing={isFollowing}
            threshold={Number(threshold?.value)}
            filters={toxicityLabels}/>
        )   
}
 
export default UserPage;