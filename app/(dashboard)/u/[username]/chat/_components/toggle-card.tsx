"use client"

import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {  useTransition } from "react"
import { updateStream } from "@/actions/stream" 
import { Skeleton } from "@/components/ui/skeleton"
import { MoonStar, Sun } from 'lucide-react';

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"  

interface ToggleCardProps {
    field: FieldTypes,
    label: string,
    value: boolean   
}

export const ToggleCard = ({
    field,
    label,
    value
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();

    const onChange = () => {
        startTransition(() => {
            updateStream({[field] : !value})
            .then(() => toast.success("Chat setings updated successfully!"))
            .catch(() => toast.error("Chat setings update was unsuccessfull"))
        });
    }

    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">{label}</p>
                <div className="space-x-2 flex flex-row-auto">
                    <MoonStar />
                    <Switch checked={value}
                        onCheckedChange={onChange}
                        disabled={isPending}>
                        {value? "On" : "Off"}
                    </Switch>
                    <Sun/>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}
