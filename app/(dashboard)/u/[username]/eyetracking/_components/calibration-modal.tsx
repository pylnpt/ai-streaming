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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useState, useTransition, useRef, ElementRef } from "react"
import { toast } from "sonner" 



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