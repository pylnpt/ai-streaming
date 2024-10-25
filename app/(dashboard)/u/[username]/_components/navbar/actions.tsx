import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Clapperboard, LogOut } from "lucide-react";
import { Logo } from "./logo";

const Action = async() => {

    return (
        <>
        <div className=" flex items-center justify-end gap-x-2">
            <Button size="sm"
                variant="ghost"
                className="text-muted-foreground hover:bg-primary"
                asChild>
                <Link href="/">
                    <LogOut className="h-5 w-5 mr-2"/>
                    Exit
                </Link>
            </Button>
            <UserButton />
        </div>
        </>
      );
}
 
export default Action;