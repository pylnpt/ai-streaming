"use client"

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "@/components/ui/select"
import { useEffect, useRef, useState } from "react";
import  { CalibrationModal }  from "./calibration-modal";

export const CameraCard = () => {
    const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string | undefined>(undefined);
    
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleCameraChange = (value: string) => {
        setSelectedCamera(value);
    };

    

    const startVideoPreview = async () => {
        if (selectedCamera && videoRef.current) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: selectedCamera },
                });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing the selected camera:', error);
            }
        }
    };

    const getCameraDevices = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(
                        device => device.kind === 'videoinput'
                    );
                setCameraDevices(videoDevices);
            } else {
                console.error('Media devices are not supported in this browser.');
            }
        } catch (error) {
            console.error('Error fetching camera devices:', error);
        }
    };

    useEffect(() => { getCameraDevices(); }, []);
    useEffect(() => {
        startVideoPreview();
        
        // Cleanup function to stop the video stream when component unmounts or camera changes
        return () => {
          if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
          }
        };
      }, [selectedCamera]);

    return (
        <div className="sm:space-y-12 md:space-y-12 lg:flex lg:space-x-10 lg:space-y-0">
            <div className="rounded-xl p-6 border-2 border-primary bg-background w-[500px]">
                <p className="font-semibold shink-0 pb-9 w-full ">Eye tracker calibration</p>
                <div className="flex items-center gap-x-10">           
                    <div className="space-y-2 w-[300px]  border border-primary">
                        <div className="w-full flex items-center gap-x-2">
                            <Select value={selectedCamera} 
                                onValueChange={handleCameraChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose your camera" />
                                        <SelectContent>
                                            { cameraDevices.length > 0 
                                            ? ( cameraDevices.map((device) => (
                                                <SelectItem key={device.deviceId} value={device.deviceId || "asd"}>
                                                    {device.label || 'Unnamed Camera'}
                                                </SelectItem>
                                            ))
                                            ) : (
                                                <SelectItem disabled value="no-camera"> No camera devices found </SelectItem>
                                            )}
                                        </SelectContent>
                                </SelectTrigger>
                            </Select>
                        </div>
                        
                    </div>
                    <CalibrationModal />
                </div>
            </div>

            <div className="rounded-xl p-6 border-2 border-primary bg-background w-[500px]">
                <h3 className="font-semibold shink-0 pb-9">Camera Preview</h3>
                <video ref={videoRef} autoPlay playsInline className=" h-[300px]  w-[300px] border rounded border-primary" />
            </div>
        </div>
    )
}