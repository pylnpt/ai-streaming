"use client"

import { useTransition } from "react" 
import { Skeleton } from "@/components/ui/skeleton"
import React from 'react';
import { toast } from "sonner";
import { updateProfanityStatus } from "@/lib/profanity-service";
import { User } from "@prisma/client";
import { MoonStar, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AIToggleCardProps {
    value: boolean,
    user: User
    hasAnyFilterSelected: boolean 
}   

export const AIToggleCard = ({
    value,
    user,
    hasAnyFilterSelected
}: AIToggleCardProps) => {
    const [isPending, startTransition] = useTransition();
    
    const onChange = () => {
        startTransition(() => {
            if(!hasAnyFilterSelected){
                toast.error("First you have to select some filters to enable this feature.")
            } else {
                updateProfanityStatus(user, !value)
                .then(() => {
                    const toastMessage = value ? `Profanity filter in chat turned Off.` : `Profanity filter in chat turned On.`;  
                    toast.success(toastMessage);
                })
                .catch((err) => {
                    toast.error("Profanity filter update has failed.")
                    console.log(err);
                })
            }
        });
    }

    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary gap-y-5">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">Toggle AI</p>
                <div className="space-x-2 flex flex-row-auto">
                    <MoonStar />
                    <Switch checked={value}
                        onCheckedChange={onChange}
                        disabled={ isPending}>
                        {value? "On" : "Off"}
                    </Switch>
                    <Sun/>
                </div>
            </div>
        </div>
    )
}

export const AIToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}
