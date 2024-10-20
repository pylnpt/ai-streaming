"use client"
 
import { Button } from "@/components/ui/button";
import { useSideBar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSideBar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";



    return (
        <>
        {collapsed && (
            <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                <Button variant="ghost" className="h-auto p-2" onClick={onExpand}>
                    <ArrowRightFromLine className="h-4 w-4"/>
                </Button>
            </div>
        )}
        {!collapsed && (
            <div className="p-3 pl-6 mb-2 flex items-center w-full">
                <p className="font-semibold text-primary">For you</p>
                <Button onClick={onCollapse}
                    className="h-auto p-2 ml-auto"
                    variant="ghost">
                    <ArrowLeftFromLine className="h-4 w-4"/> 
                </Button>
            </div>
        )}
        </>
        );
}
 
export default Toggle;<div>Toggle</div>