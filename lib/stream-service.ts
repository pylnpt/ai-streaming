import { db } from "@/lib/db";
import { Stream } from "@prisma/client";

export const getStreamByUserId = async (userId: string) => {
    const stream = await db.stream.findUnique({
        where: {userId},
    });
    return stream;
}

export const updateStreamById = async (userId: string, validData: Partial<Stream>) => {
    const stream = await db.stream.update({
        where: {
            id: userId
        },
        data: {
            ...validData,
        }
    });
    return stream;
}