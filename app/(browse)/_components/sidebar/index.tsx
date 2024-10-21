import { getRecomended } from "@/lib/recomended-service";
import Recommended from "./recomended";
import Toggle from "./toggle";
import Wrapper from "./wrapper";

const Sidebar = async () => {
    const recomendedUsers = await getRecomended();
    
    return ( 
    <Wrapper>
        <Toggle/>
        <div className="space-y-4 pt-4 lg:pt-0">
            <Recommended data={recomendedUsers}/>
        </div>
    </Wrapper>
    );
}
 
export default Sidebar;