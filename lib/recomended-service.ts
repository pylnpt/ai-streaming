import { db } from "./db";
import { getSelf } from "./authservice";

export const getRecomended = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });

    return users;
}