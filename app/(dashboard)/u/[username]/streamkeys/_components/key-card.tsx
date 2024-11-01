"use client"

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";


interface KeyCardProps {
    value: string | null;
}

export const KeyCard = ({
    value
}: KeyCardProps) => {
    const [show, setShow] = useState(false);
    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">Stream key</p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2 border border-primary">
                        <Input value={value || ""}
                        type={show ? "text" : "password"} 
                        disabled
                        placeholder="Stream key"/>
                        <CopyButton value={value || ""}/>
                    </div>
                    <Button variant="link"
                        size="sm"
                        onClick={() => setShow(!show)}>
                        {show? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}