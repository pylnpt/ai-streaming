"use-client";

import { Separator } from "@radix-ui/react-select";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { StreamerInfoModal } from "./streamer-info-modal";

interface StreamerInfoCardProps {
    hostIdentity: string;
    viewerIdentity: string;
    thumbNailUrl?: string | null;
    name: string;
}

export const StreamInfoCard = ({
    hostIdentity,
    viewerIdentity,
    thumbNailUrl,
    name,
}: StreamerInfoCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    if(!isHost) return null;

    return (
        <div className="px-4">
            <div className="rounded-xl bg-background border-2 border-primary">
                <div className="flex items-center gap-x-2.5 p-4">
                    <div className="rounded-md bg-green-600 p-2 h-auto w-auto">
                        <Pencil className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-sm lg:text-lg font-semibold capitalize">
                            Edit your Stream&apos;s info
                        </h2>
                        <p className="text-muted-foreground text-xs lg:text-sm">Help your Stream to be seen.</p>
                    </div>
                    <StreamerInfoModal 
                        initialName={name}
                        initialThumbnailUrl={thumbNailUrl}
                        />
                </div>

                <Separator />
                <div className="p-4 lg:p-6 space-y-4">
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
                        <p className="text-sm font-semibold">{name}</p>
                    </div>
                </div>

                <div className="p-4 lg:p-6 space-y-4">
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">Stream Thumbnail</h3>
                        {thumbNailUrl && (
                            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                                <Image fill
                                    src={thumbNailUrl}
                                    alt={name} 
                                    className="object-cover"/>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}