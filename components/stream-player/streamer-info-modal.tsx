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
import { ElementRef, useRef, useState, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash, Trash2 } from "lucide-react";
import Image from "next/image";


interface StreamerInfoModalProps {
    initialName: string;
    initialThumbnailUrl?: string | null;
}

export const StreamerInfoModal = ({
    initialName,
    initialThumbnailUrl,
}: StreamerInfoModalProps) => {
    const [name, setName] = useState(initialName);
    const [thumbNailUrl, setThumbNailUrl] = useState(initialThumbnailUrl);

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const closeRef = useRef<ElementRef<"button">>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({name : name})
                .then(() => {
                    toast.success("Stream updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Stream update was unsuccessfull"))
        })
    }

    const onThumbnailDelete = () =>{
        startTransition(() => {
            updateStream({thumbnailUrl : null})
            .then(() => {
                toast.success("Thumbnail delete was successfull!");
                setThumbNailUrl("");
            })
            .catch(() => {toast.error("Thumbnail delete was unsuccessfull!")});
        })
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
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending} 
                            />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Stream Thumbnail
                        </Label>
                        {thumbNailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Delete"
                                        asChild
                                        side="left">
                                        <Button type="button"
                                            disabled={isPending}
                                            onClick={onThumbnailDelete}
                                            className="h-auto w-auto p-1.5">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image src={thumbNailUrl}
                                    alt="Stream Thumbnail"
                                    className="object-cover"
                                    fill
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone endpoint="uploadThumbnail"
                                    appearance={{
                                      label: {
                                        color: "#FFFFFF"
                                    },
                                        allowedContent: {
                                            color: "#FFFFFF"
                                        }
                                    }}
                                    onClientUploadComplete={(res) =>{
                                        setThumbNailUrl(res?.[0].url)
                                        router.refresh();
                                    }}
                                    />
                            </div>
                        )}
                        
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button type="button"
                                variant="ghost"
                                ref={closeRef}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit"
                            variant="primary"
                            disabled={isPending}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}