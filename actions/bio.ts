"use server"

import { getSelf } from "@/lib/authservice";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateBio  = async (val: Partial<User>) => {
    const self = await getSelf();
        
    const dataToUse = {
        bio: val.bio
    };
        
    const user = await db.user.update({
        where: { id: self.id},
        data: { ...dataToUse }
    });
    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
}