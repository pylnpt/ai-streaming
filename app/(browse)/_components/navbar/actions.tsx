import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { auth } from "@/auth";
import Link from "next/link";
import { Settings } from "lucide-react";

const Action = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
        {!user && (
          <Button size="sm" variant="primary" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
        {!!user && (
          <div className="flex items-center gap-x-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-primary hover:text-background"
              asChild
            >
              <Link href={`/u/${user.username}`}>
                <Settings className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Settings</span>
              </Link>
            </Button>
            <UserButton user={user} />
          </div>
        )}
      </div>
    </>
  );
};

export default Action;