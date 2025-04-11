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

    return ( 
    <div className="h-full">
        <StreamPlayer user={user}
            stream={user.stream}
            isFollowing 
            threshold={Number(threshold!.value)}
            filters={toxicityLabels}/>

    </div> );
}
 
export default CreatorPage;