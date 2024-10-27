import { StreamPlayer } from "@/components/stream-player";
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

    if(!user || user.externalUserId !== currUser?.id || !user.stream) {
        throw new Error("Unauthorized")
    }

    return ( 
    <div className="h-full">
        <StreamPlayer user={user}
            stream={user.stream}
            isFollowing />

    </div> );
}
 
export default CreatorPage;