import {db} from "@/lib/db";
import { getSelf } from "@/lib/authservice";
import { getUserById } from "./user-service";
import { error } from "console";

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf();
        const otherUser = await getUserById(id);
        
        if(!otherUser) { throw new Error("User not found"); }
        if(otherUser.id === self.id) { return false}
        
        const amIBlocked = await db.block.findFirst({
            where: {
                blockerId: otherUser.id,
                blockedId: self.id,
            } 
        })

        return !!amIBlocked;
    } catch {
        return false;
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf();
    if(self.id === id) { throw new Error("Cannot block yourself")}
        
    const otherUser = await getUserById(id);
    if(!otherUser) { throw new Error("User not found"); }    
    if(otherUser.id === self.id) { return false}
        
    const alreadyBlocked = await db.block.findFirst({
        where: {
            blockerId: self.id,
            blockedId: otherUser.id,
        } 
    })
    if(alreadyBlocked) { throw new Error("You have already blocked the User")}
        
    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true,
        },
    })
    return block;
}

export const unblockUser = async (id: string) => {
    const self = await getSelf();
    if(self.id === id) { throw new Error("Cannot block yourself")}
        
    const otherUser = await getUserById(id);
    if(!otherUser) { throw new Error("User not found"); }
        
    if(otherUser.id === self.id) { return false}
        
    const blockedUser = await db.block.findFirst({
        where: {
            blockerId: self.id,
            blockedId: otherUser.id,
        } 
    })
    if(!blockedUser) { throw new Error("Not blocked user")}
        
    const unblock = await db.block.delete({
        where: {
            id: blockedUser.id,
        },
        include: {
            blocked: true,
        }
    })
    return unblock;
}
