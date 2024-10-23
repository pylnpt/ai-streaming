import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

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
    
    return ( 
        <div className="flex flex-col gap-y-4">
            <h1>USER: </h1>
            <p>Id: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Follower: {`${isFollowing}`}</p>
            <Actions isFollowing={isFollowing}
                userId={user.id}/>

        </div> );
}
 
export default UserPage;