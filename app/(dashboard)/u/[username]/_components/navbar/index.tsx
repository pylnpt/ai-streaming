import SearchBar from "@/app/(browse)/_components/navbar/search";
import Action from "./actions";
import { Logo } from "./logo";

const Navbar = () => {
    return ( 
    <nav className="fixed top-0 w-full h-20 z-[49] bg-background px-2
         lg:px-4 flex justify-between items-center shadow-sm border-2 border-primary">
        <Logo/>
        <Action/>
    </nav> );
}
 
export default Navbar;