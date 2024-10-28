"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnFollow } from "@/actions/follow";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    hostIdentity: string;
    isHost: boolean;
}

export const Actions = ({
    isFollowing,
    hostIdentity,
    isHost,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const { userId }  = useAuth();
    const  router  = useRouter();

    const handleFollow = () =>{
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You have started following ${data.following.username}.`))
                .catch(() => toast.error("Something went wrong."))
        })
    }

    const handleUnFollow = () =>{
        startTransition(() => {
            onUnFollow(hostIdentity)
                .then((data) => toast.success(`You have stopped following ${data.following.username}.`))
                .catch(() => toast.error("Something went wrong."))
        })
    }

    const toggleFollow = () => {
        if(!userId) {
            return router.push("/sign-in");
        }
        if(isHost) return;
        
        if (isFollowing) { handleUnFollow(); }
        else { handleFollow(); }
    }

    return (
        <Button 
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
            disabled={isPending || isHost}>
            
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )}/>
            {isFollowing ? "Unfollow" : "Follow"}
            
        </Button>
    )
}