"use client"

import { updateEyetrackingStatus } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { EyeClosed , Eye } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface ToggleEyeTrackingCardProps {
    value: boolean   
}

export const ToggleEyeTracking = ({
    value
}: ToggleEyeTrackingCardProps ) =>{    
    const [isPending, startTransition] = useTransition();
    const onChange = () => {
        startTransition(() => {
            updateEyetrackingStatus({eyeIsTracked : !value})
            .then(() => { !value ? toast.success(`Succesfully turned On.`) :  toast.success(`Succesfully turned Off.`)})
            .catch(() => toast.error("Eye tracker settings update has failed."))
        });
    }

    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">Eye tracking status</p>
                <div className="space-x-2 flex flex-row-auto">
                    <EyeClosed />
                    <Switch checked={value}
                        onCheckedChange={onChange}
                        disabled={isPending}>
                        {value? "On" : "Off"}
                    </Switch>
                    <Eye/>
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
