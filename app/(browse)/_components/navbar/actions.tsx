import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Settings  } from "lucide-react";

const Action = async() => {
    const user = await currentUser();

    return (
        <>
        <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            {!user && (
                <SignInButton>
                    <Button size="sm" variant="primary">
                        Login
                    </Button>
                </SignInButton>
            )}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Button size="sm"
                        variant="ghost" 
                        className="text-primary hover:text-background" 
                        asChild>
                            <Link href={`/u/${user.username}`}>
                                <Settings className="h-5 w-5 lg:mr-2"/>
                                <span className="hidden lg:block">
                                    Settings
                                </span>
                            </Link>
                    </Button>
                    <UserButton/>
                </div>
            )}
        </div>
        </>
      );
}
 
export default Action;