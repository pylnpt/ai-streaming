"use client"

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string;
};

export const UnblockButton = ({
    userId
}: UnblockButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
            .then((res) => {toast.success(`You have successfully unblocked ${res.blocked.username}.`)})
            .catch(() => toast.error("Unblock  was unsuccessfull. Please try again later."))
        })
    }
    return (
        <Button disabled={isPending}
            onClick={onClick}
            variant="ghost"
            className="text-primary w-full">
                Unblock
        </Button>
    )
}