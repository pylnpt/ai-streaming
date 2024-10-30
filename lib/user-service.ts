import { db } from "@/lib/db";

export const getUserByUserName = async( username: string) => {
    const user = await db.user.findUnique({
        where:{
            username: username
        },
        include: {
            stream: true,
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