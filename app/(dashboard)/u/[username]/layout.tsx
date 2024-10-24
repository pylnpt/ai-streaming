import { getSelfByUsername } from "@/lib/authservice";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

interface CreatorLayoutProps {
    params: {username: string};
    children: React.ReactNode
} 

const CreatorLayout = async ({
    params,
    children,
}: CreatorLayoutProps) => {
    const self = getSelfByUsername(params.username);
    if(!self) {
        redirect("/");
    }



    return (
        <>
        <Navbar/>
            <div className="flex h-full pt-20">
                <Sidebar />
                {children}
            </div>
        </>
    );
}
 
export default CreatorLayout;