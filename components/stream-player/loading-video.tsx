import { Loader } from "lucide-react";

interface LoadingProps {
    label: string;
}

export const Loading = ({
    label
}: LoadingProps) => {
    return (
        <div  className="h-full flex flex-col space-y-4 justify-center items-center">
            <Loader className="h-10 w-10 text-primary animate-spin" />
            <p className="text-primary capitalize">
                {label} 
            </p>
        </div>
    )
}