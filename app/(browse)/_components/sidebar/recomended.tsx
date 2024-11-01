"use client";

import { useSideBar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
    data: (User & {
        stream: {isStreaming: boolean} | null;
    })[];
}

const Recommended = ({
    data
}: RecommendedProps) => {
    const {collapsed} = useSideBar((state) => state);

    const showLabel = !collapsed && data.length > 0;

    return ( 
        <div>
            {showLabel && (
            <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">
                    Recomended
                </p>
            </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem 
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isStreaming={user.stream?.isStreaming}/>
                ))}
            </ul>
        </div>
     );
}
 
export default Recommended;

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(5)].map((_,i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}