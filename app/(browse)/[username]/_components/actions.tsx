"use client"

import { Button } from "@/components/ui/button";
import { onFollow, onUnFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onUnblock } from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean
    userId: string
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const handleFollow = () => {
        startTransition(() =>{
            onFollow(userId)
            .then((data) => {
                toast.success(`You are now following ${data.following.username}`)})
            .catch(() => toast.error("Something went wrong.\nPlease try again later."))
        })
    }

    const handleUnFollow = () => {
        startTransition(() =>{
            onUnFollow(userId)
            .then((data) => {
                toast.success(`You have successfully unfollowed ${data.following.username}`)})
            .catch(() => toast.error("Something went wrong.\nPlease try again later."))
        })
    }

    const handleBlock = () => {
        startTransition(() =>{
            onUnblock(userId)
            .then((data) => {
                toast.success(`Blocked the user ${data}`)})
            .catch(() => toast.error("Something went wrong.\nPlease try again later."))
        })
    }

    const onClick = () => {
        if(isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }
    
    return (
        <>
            <Button variant="primary"
                onClick= {onClick}
                disabled={isPending}>
                { isFollowing? "Unfollow" : "Follow"}
            </Button>
            
            <Button variant="destructive"
                onClick= {handleBlock}
                disabled={isPending}>
                { isFollowing? "Unblock" : "Block"}
            </Button>
        </>  
    );
}