import { WifiOff } from "lucide-react";

interface OfflineProps {
    username: string;
}

export const Offline = ({
    username
}: OfflineProps) => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">
                {username} is Offline rigth now. 
            </p>
        </div>
    )
}