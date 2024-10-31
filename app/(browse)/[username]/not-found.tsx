import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
    return (  
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <p>There is no user like that at all.</p>
            <Button variant="secondary" asChild>
                <Link href="/">Home</Link>
            </Button>
        </div>
    );
}
 
export default NotFoundPage;