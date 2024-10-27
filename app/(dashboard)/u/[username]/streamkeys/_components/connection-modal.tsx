"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { IngressInput } from "livekit-server-sdk"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useState, useTransition, useRef, ElementRef } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP; 


export const ConnectionModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null)
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    const [isPending, startTransition] = useTransition();

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
            .then(() => {
                toast.success("Ingress successfully created");
                closeRef?.current?.click();
            })
            .catch((error) => {toast.error("Something went wrong"); console.log(error)})
        })
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                    disabled={isPending}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                        <SelectContent>
                            <SelectItem value={RTMP}>RTMP</SelectItem>
                            <SelectItem value={WHIP}>WHIP</SelectItem>
                        </SelectContent>
                    </SelectTrigger>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        If you choose this, this will reset all active stream using the current connection
                    </AlertDescription>
                </Alert>
                <Alert>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="primary"
                            disabled={isPending}
                            onClick={onSubmit}>
                                Generate
                        </Button>
                    </div>
                </Alert>
            </DialogContent>
        </Dialog>
    )
}