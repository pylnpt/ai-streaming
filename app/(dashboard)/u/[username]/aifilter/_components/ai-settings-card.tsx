"use client"

import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useTransition } from "react"
import { updateStream } from "@/actions/stream" 
import { Skeleton } from "@/components/ui/skeleton"
import { MoonStar, Sun } from 'lucide-react';  
import MultipleSelector, { Option } from '@/components/ui/multi-select-picker';
import React from 'react';

interface AISettingsCardProps {
    selectPickerChoices: string[]
    value: boolean
}

export const AISettingsCard = ({
    value
}: AISettingsCardProps) => {
    const [isPending, startTransition] = useTransition();
    const OPTIONS: Option[] = [
        {  label:'Identity Atack', value:'identity_attack' }, 
        {  label:'Insult', value:'insult' }, 
        {  label:'Obscene content', value:'obscene' }, 
        {  label:'Severe Toxicity', value:'severe_toxicity' }, 
        {  label:'Sexual Explicit', value:'sexual_explicit' }, 
        {  label:'Threat', value:'threat' },
        {  label:'Toxicity', value:'toxicity' },
      ];

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
            <div className="flex items-center justify-between">
            <p className="font-semibold shrink-0">Filter</p>
                <MultipleSelector
                    defaultOptions={OPTIONS}
                    placeholder="Select what type of chat message would you like to filter..."
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                        </p>
                    }
                />
            </div>
        </div>
    )
}

export const AISettingsCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}
