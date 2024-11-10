"use client"

import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import { updateStream } from "@/actions/stream" 
import { Skeleton } from "@/components/ui/skeleton"
import { MoonStar, Sun } from 'lucide-react';  
import MultipleSelector, { Option } from '@/components/ui/multi-select-picker';
import React from 'react';
import { AIFilter } from "@prisma/client"

interface AIToggleCardProps {
    value: boolean
}

export const AIToggleCard = ({
    value
}: AIToggleCardProps) => {
    const [isPending, startTransition] = useTransition();
    const [activeFilters, setActiveFilters] = useState<string[] | undefined>([]);
    // setActiveFilters(selectedFilters);

    // console.log(SELECTEDOPTIONS);

    // const onChange = () => {
    //     startTransition(() => {
    //         updateStream({ : !value})
    //         .then(() => toast.success("Chat setings updated successfully!"))
    //         .catch(() => toast.error("Chat setings update was unsuccessfull"))
    //     });
    // }

    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary gap-y-5">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">Toggle AI</p>
                <div className="space-x-2 flex flex-row-auto">
                    <MoonStar />
                    <Switch checked={value}
                        onCheckedChange={()=> {}}
                        disabled={isPending}>
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
