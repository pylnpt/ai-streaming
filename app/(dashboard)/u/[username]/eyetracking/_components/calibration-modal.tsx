"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"



export const CalibrationModal = () => {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary" className="border border-primary">
                    Calibrate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Calibration Modal</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}