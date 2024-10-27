"use client"

import { useTracks } from "@livekit/components-react"
import { Participant, Track } from "livekit-client"
import { useRef, useState } from "react"
import { FullscreenControl } from "./fullscreen-control"
import { useEventListener } from "usehooks-ts"


interface LiveProps {
    participant: Participant
}

export const Live = ({
    participant
} : LiveProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullScreen] = useState(false);
    const toggleFullscreen = () => {
        if(isFullscreen) {
            document.exitFullscreen();
        } else if(wrapperRef?.current) {
            wrapperRef.current.requestFullscreen();
        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullScreen(isCurrentlyFullscreen);
        useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

    }

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if(videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        })
    return (
        <div className="relative h-full flex"
            ref={wrapperRef}>
            <video width="100%" ref={videoRef} />
            <div className="absolute top-0 h-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <FullscreenControl isFullscreen={isFullscreen}
                        onToggle={toggleFullscreen}/>
                </div>
            </div>
        </div>
    )
}