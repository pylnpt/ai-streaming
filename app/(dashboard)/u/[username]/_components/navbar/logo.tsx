import Image from "next/image";
import { Poppins} from "next/font/google";
import Link from "next/link"

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets : ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    return ( 
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-primary rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink-0">
                    <Image src="/logo.png"
                        alt="logoplaceholder"
                        height="32"
                        width="32"/>
                </div>
                <div className={cn(
                    "hidden lg:block",
                    font.className)}>
                    <p className="text-lg font font-semibold">Stream Settings</p>   
                </div>
            </div>
        </Link>
       
     );
}