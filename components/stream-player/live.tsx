"use client"

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";

interface LiveProps {
    participant: Participant;
}

const useFullscreenChange = (wrapperRef: React.RefObject<HTMLDivElement>) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement === wrapperRef.current;
        setIsFullscreen(isCurrentlyFullscreen);
    };
    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, [wrapperRef]);

    return isFullscreen;
};

export const Live = ({ participant }: LiveProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [volume, setVolume] = useState(0);

    // PLACE THIS TO A DIFFERENT FILE!!!!!
    const isFullscreen = useFullscreenChange(wrapperRef);

    const onVolumeChange = (val: number) => {
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.muted = val === 0;
            videoRef.current.volume = val * 0.01;
        }
    };

    const toggleMute = () => {
        const isMuted = volume === 0;
        const newVolume = isMuted ? 50 : 0;
        setVolume(newVolume);

        if (videoRef.current) {
            videoRef.current.muted = newVolume === 0;
            videoRef.current.volume = newVolume * 0.01;
        }
    };

    useEffect(() => {
        onVolumeChange(0); // Set initial volume to 0 on mount
    }, []);

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen();
        }
    };

    // Attach participant's video and audio tracks to the video element
    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });

    return (
        <div className="relative h-full flex" ref={wrapperRef}>
            <video width="100%" ref={videoRef} />
            <div className="absolute top-0 h-full opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl onToggle={toggleMute} onChange={onVolumeChange} value={volume} />
                    <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
                </div>
            </div>
        </div>
    );
};
