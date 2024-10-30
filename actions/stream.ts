"use server";

import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/authservice";
import { Stream } from "@prisma/client";
import { getStreamByUserId, updateStreamById } from "@/lib/stream-service";

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf();
        const stream = await getStreamByUserId(self.id);
        
        if(!stream) {
            throw new Error("There is no stream to update!")
        }

        const validData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled : values.isChatEnabled,
            isChatDelayed : values.isChatDelayed,
            isChatFollowersOnly : values.isChatFollowersOnly
        }

        const streamToUpdate = await updateStreamById(stream.id, validData);
        revalidatePath(`/u/${self.username}`);
        revalidatePath(`/${self.username}`);

    } catch {
        throw new Error("Internal Error");
    }
}