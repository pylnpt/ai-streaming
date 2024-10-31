"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";


interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
    isFollowing: boolean;
}
export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isDelayed,
    isFollowing
}: ChatFormProps) => {
    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);
    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;
        if(isDelayed && !isDelayedBlocked) {
            setIsDelayedBlocked(true);
            setTimeout(() => {
                setIsDelayedBlocked(false);
                onSubmit();
            }, 50000)
        } else {
            onSubmit();
        }
    }

    if(isHidden) {
        return null;
    }

    return(
        <form className="flex flex-col items-center gap-y-4 p-3"
            onSubmit={handleSubmit}>
            Chat Type form
            <div className="w-full">
                <ChatInfo isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}/>
                <Input  onChange={(e) => {onChange(e.target.value)}}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Join in the chat"
                    className={cn(
                        "border-white/10",
                        isFollowersOnly || isDelayed && "rounded-t-none border-t-0"
                    )}/>
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={false}>
                    Chat
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col imtes-center gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7"/>
                <Skeleton className="h-7 w-12"/>
            </div>
        </div>
    );

}