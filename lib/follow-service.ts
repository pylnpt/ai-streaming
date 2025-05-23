import { db } from "./db";
import { getSelf } from "./authservice";
import { getUserById } from "./user-service";

export const isFollowingUser = async (id: string) => {   
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if(!otherUser) { throw new Error("User not found"); }
        if ( otherUser.id === self.id) { return true; }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow;
    } catch {
        return false;   
    }
}
export const checkExistingFollow = async (selfId: string, otherUserId: string ) =>{
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: selfId,
            followingId: otherUserId
        },
    });
    
    return existingFollow;
}

export const followUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await getUserById(id);

    if(!otherUser) { throw new Error("User not found"); }
    if(otherUser.id === self.id) {throw new Error("Cannot follow yourself"); }

    const existingFollow = await checkExistingFollow(self.id, otherUser.id);

    if(existingFollow) {throw new Error("Already following")};

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true,
        },
    });
    return follow;
}

export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await getUserById(id);
    
    if(!otherUser) { throw new Error("User not found"); }
    if (otherUser.id === self.id ) {throw new Error("You can't unfollow yourself")}

    const existingFollow = await checkExistingFollow(self.id, otherUser.id);
    if(!existingFollow) { throw new Error("You are not following this user")}
    
    const follow = db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true,
        }
    })

    return follow;
}

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();
        
        const followedUsers =  db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        },
                    },
                }, 
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isStreaming: true
                            },
                        },
                    },
                },
            }
        })
        return followedUsers;
    } catch {
        return [];
    }
}