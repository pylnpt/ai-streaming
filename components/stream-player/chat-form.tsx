"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


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
    return(
        <form className="flex flex-col items-center gap-y-4 p-3"
            onSubmit={() => {}}>
            Chat Type form
            <div className="w-full">
                <Input  onChange={() => {}}
                    value={value}
                    disabled={false}
                    placeholder="Join in the chat"
                    className={cn(
                        "border-white/10"
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