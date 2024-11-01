import { db } from "./db";
import { getSelf } from "./authservice";

export const search = async (term?: string) => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }
    let streams = [];

    if (userId ) {
        streams = await db.stream.findMany({
            where: {
                user: { 
                    NOT: { blocking: { some: { blockedId: userId }}}},
                OR: [
                    { name: { contains: term } },
                    { user: { username: { contains: term } }}
                ]
            },
            select: {
                user: true,
                id: true,
                isStreaming: true,
                name: true,
                thumbnailUrl: true,
                updatedAt: true
            },
            orderBy: [
                { isStreaming: "desc" },
                { updatedAt: "desc" }
            ]
        })        
    } else {
        streams = await db.stream.findMany({
            where: {
                OR: [
                    { name: { contains: term } },
                    { user: { username: { contains: term } }}
                ]
            },
            include: {
                user: true,
            },
            orderBy: [
                { isStreaming: "desc" },
                { updatedAt: "desc" }
            ]
        })
    }
    return streams;
} 