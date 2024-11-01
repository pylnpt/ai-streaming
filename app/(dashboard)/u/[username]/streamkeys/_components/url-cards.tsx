import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
    value: string | null;
}

export const UrlCard = ({
    value
}: UrlCardProps) => {
    return (
    <div className="rounded-xl p-6 border-2 border-primary bg-background">
        <div className="flex items-center gap-x-10">
            <p className="font-semibold shink-0">
                Server URL
            </p>
            <div className="space-y-2 w-full border border-primary">
                <div className="w-full flex items-center gap-x-2">
                    <Input disabled
                    value={value || ""} 
                    placeholder="Server URL"/>
                    <CopyButton value={value || ""}/>
                </div>
                
            </div>
        </div>
    </div>)
}