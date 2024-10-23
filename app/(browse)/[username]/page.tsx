import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserName(params.username);
    if(!user) { throw notFound() }

    const isFollowing = await isFollowingUser(user.id);
    const haveUserBeenBlocked = await isBlockedByUser(user.id);
    // if(haveUserBeenBlocked) {
    //     notFound();
    // }
    
    return ( 
        <div className="flex flex-col gap-y-4">
            <h1>USER: </h1>
            <p>Id: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Follower: {`${isFollowing}`}</p>
            <p>Is blocked by this user: {`${haveUserBeenBlocked}`}</p>
            <Actions isFollowing={isFollowing}
                userId={user.id}/>

        </div> );
}
 
export default UserPage;