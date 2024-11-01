import { db } from "@/lib/db";

export const getUserByUserName = async( username: string) => {
    const user = await db.user.findUnique({
        where:{
            username: username
        },
        select: {
            id: true,
            externalUserId: true,
            username: true,
            bio: true,
            imageUrl: true,
            stream: {
                select: {
                    id: true,
                    isStreaming: true,
                    isChatEnabled: true,
                    isChatDelayed: true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true,
                    name: true,
                }
            },
            _count: {
                select: {
                    follow: true
                }
            }
        }
    });
    return user;
};

export const getUserById = async( id: string) => {
    const user = await db.user.findUnique({
        where:{
            id: id
        },
        include: {
            stream: true
        }
    });
    return user;
};