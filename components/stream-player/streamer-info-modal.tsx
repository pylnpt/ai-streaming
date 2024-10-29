"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";

interface StreamerInfoModalProps {
    initialName: string;
    initialThumbnailUrl?: string | null;
}

export const StreamerInfoModal = ({
    initialName,
    initialThumbnailUrl,
}: StreamerInfoModalProps) => {
    const [name, setName] = useState(initialName);
    const [] = useTransition();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link"
                    size="sm"
                    className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                     <DialogTitle>
                        Edit Stream info
                     </DialogTitle>
                </DialogHeader>
                <form className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={false} 
                            />
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button type="button"
                                variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit"
                            variant="primary"
                            disabled={false}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}