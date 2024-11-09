"use client"

import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
    children: React.ReactNode;
};

const Container = ({
    children
} : ContainerProps) => {
    const {
        collapsed,
        onCollapse,
        onExpand,
    } = useSideBar((state) => state);
    const matches = useMediaQuery("(max-width: 1024px)");

    useEffect(()=> {
        if(matches) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches, onCollapse, onExpand])


    return (  
        <div className={cn(
            "flex-1",
            collapsed ? "mr-[70px]" : "mr-[70px] lg:mr-60"
        )}>
            {children}
        </div>
    );
}
 
export default Container;