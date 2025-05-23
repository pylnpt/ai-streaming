"use client";

import { Skeleton } from "../ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { ChatTypeToggle } from "./chat-type-toggle";

export const ChatHeader = () => {
    return(
        <div className="relative p-3 border-b border border-primary">
            <div className="absolute let-2 top-2 hidden lg:block">
                <ChatToggle />
            </div>
            <p className="font-semibold text-foreground text-center">
                Chat
            </p>
            <div className="absolute right-2 top-2">
                <ChatTypeToggle />
            </div>
        </div>
    )
}

export const ChatHeaderSkeleton = () => {
    return (
        <div className="relative p-3 border-b hidden md:block">
            <Skeleton  className="absolute h-6 w-6 left-3 top-3"/>
            <Skeleton  className="w-28 mx-auto"/>
        </div>
    )
}