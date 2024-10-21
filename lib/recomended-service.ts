import { db } from "./db";
import { getSelf } from "./authservice";

export const getRecomended = async () => {
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });

    return users;
}