"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
    return (  
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">Oooops! There was an errror.</h1>
            <p> Please try again later.</p>
            <Button variant="secondary" asChild>
                <Link href="/">Home</Link>
            </Button>
        </div>
    );
}
 
export default ErrorPage;