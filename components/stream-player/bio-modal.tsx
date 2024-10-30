"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateBio } from "@/actions/bio";
import { 
    useState,
    useRef,
    ElementRef,
    useTransition 
} from "react";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null
}

export const BioModal = ({
    initialValue
}: BioModalProps) => {
    const [value, setValue] = useState(initialValue || "");
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() =>{
            updateBio({ bio: value })
            .then(() => { 
                toast.success("You updated your bio successfully.");
                closeRef.current?.click();
            })
            .catch(() =>  toast.error("Something went wrong while you tried to update your bio."))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto" >Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your Bio</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <Textarea onChange={(e) => { setValue(e.target.value) }}
                        placeholder="Bio"
                        value={value || ""}
                        disabled={isPending} 
                        className="resize-none"
                        />
                        <div className="flex justify-between">
                            <DialogClose asChild ref={closeRef}>
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={isPending}
                                type="submit"
                                variant="primary">
                                Save
                            </Button>
                        </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}