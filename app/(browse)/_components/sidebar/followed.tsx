"use client"

import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";
import { useSideBar } from "@/store/use-sidebar";

interface FollowedProps {
    data: (Follow & {
            following: User & {
            stream: { isStreaming: boolean } | null
            }
        })[],
    }

const Followed = ({
    data
}: FollowedProps) => {
    const { collapsed } = useSideBar((state) => state);
    if(!data.length) {
        return null
    };

    return (  
        <div>
            {!collapsed && (
            <div className="pl-6 mb-4">
                <p className="text-sm text-muted-foreground">
                    Followed Users
                </p>
            </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem 
                        key={user.following.id}
                        username={user.following.username}
                        imageUrl={user.following.imageUrl}
                        isStreaming={user.following.stream?.isStreaming}/>
                ))}
            </ul>
        </div>
    );
}
 
export default Followed;

export const FollowedSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) =>(
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}