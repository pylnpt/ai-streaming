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

interface ConnectionModalProps {

}

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export const ConnectionModal = ({} : ConnectionModalProps) => {
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
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                        <SelectContent>
                            <SelectItem value="RTMP">RTMP</SelectItem>
                            <SelectItem value="WHIP">WHIP</SelectItem>
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
                        <DialogClose>
                            <Button variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="primary"
                            onClick={() => {}}>
                                Generate
                        </Button>
                    </div>
                </Alert>
            </DialogContent>
        </Dialog>
    )
}