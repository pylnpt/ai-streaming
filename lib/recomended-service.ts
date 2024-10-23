import { db } from "./db";
import { getSelf } from "./authservice";
import { User } from "@clerk/nextjs/server";

export const getRecomended = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)) // TODO: REMOVE THIS  
    let userId;
    
    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }

    let userArray = []
    if(userId) {
        userArray = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT:  {
                            id: userId
                        },
                    },
                    {
                        NOT:  {
                            follow: {
                                some: {
                                    followerId : userId
                                }
                            }
                        }
                    },
                    {
                        NOT:  {
                            blocking: {
                                some: {
                                    blockedId : userId
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: "desc"
            },
        })
    } else {
        userArray = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });
    }

    return userArray;
}