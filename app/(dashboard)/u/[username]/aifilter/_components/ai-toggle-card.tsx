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
                toast.error("Please select at least one content type to filter before enabling.")
            } else {
                updateProfanityStatus(user, !value)
                .then(() => {
                    const toastMessage = value ? `Content filter disabled` : `Content filter enabled`;
                    toast.success(toastMessage);
                })
                .catch((err) => {
                    toast.error("Failed to update content filter settings")
                    console.log(err);
                })
            }
        });
    }

    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary gap-y-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-semibold shrink-0">Enable Content Filter</p>
                    <p className="text-sm text-muted-foreground">Filter inappropriate messages automatically</p>
                </div>
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
