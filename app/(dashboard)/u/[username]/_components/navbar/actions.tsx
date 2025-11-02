import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { auth } from "@/auth";
import Link from "next/link";
import { LogOut } from "lucide-react";

const Action = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <>
      <div className=" flex items-center justify-end gap-x-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-primary hover:bg-primary"
          asChild
        >
          <Link href="/">
            <LogOut className="h-5 w-5 mr-2" />
            Exit
          </Link>
        </Button>
        <UserButton user={user} />
      </div>
    </>
  );
};

export default Action;