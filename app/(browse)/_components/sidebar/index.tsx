import { getRecomended } from "@/lib/recomended-service";
import Recommended, { RecommendedSkeleton } from "./recomended";
import Toggle, { ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";
import { getFollowedUsers } from "@/lib/follow-service";
import Followed, { FollowedSkeleton } from "./followed";
import { Separator } from "@/components/ui/separator";

const Sidebar = async () => {
    const recomendedUsers = await getRecomended();
    const followedUsers = await getFollowedUsers();
    
    return ( 
    <Wrapper>
        <Toggle/>
        <div className="space-y-4 pt-4 lg:pt-0">
            <Followed data={followedUsers} />
            {followedUsers.length !== 0 && (
                <Separator className="bg-primary"/>
            )}
            <Recommended data={recomendedUsers}/>
        </div>
    </Wrapper>
    );
}
 
export default Sidebar;

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <FollowedSkeleton />
            <RecommendedSkeleton />
        </aside>
    )
}