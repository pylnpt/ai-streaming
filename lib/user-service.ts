import { db } from "@/lib/db";

export const getUserByUserName = async( username: string) => {
    const user = await db.user.findUnique({
        where:{
            username: username
        },
    });
    return user;
};

export const getUserById = async( id: string) => {
    const user = await db.user.findUnique({
        where:{
            id: id
        },
    });
    return user;
};