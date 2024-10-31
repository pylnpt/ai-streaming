import { getSelf } from "./authservice";
import { db } from "./db";

export const getStreams = async () =>{
    let userId;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }

    let streams = [];

    if(userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockerId: userId, 
                            }
                        }
                    }
                }
            },
            include: {
                user: true
            }, 
            orderBy: [
                { isStreaming: "desc" }, 
                { updatedAt: "desc" }
            ] 
        })
    } else {
        streams = await db.stream.findMany({
            include: {
                user: true
            },
            orderBy: [
                { isStreaming: "desc" }, 
                { updatedAt: "desc" }
            ] 
        })
    }

    return streams;
}