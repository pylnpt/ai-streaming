import Action from "./actions";
import { Logo } from "./logo";
import SearchBar from "./search";

const Navbar = () => {
    return ( 
    <nav className="fixed top-0 w-full h-20 z-[49]
         bg-background px-2 lg:px-4 flex justify-between 
         items-center shadow-sm border-2 border-primary">
        <Logo/>
        <SearchBar/>
        <Action/>
    </nav> );
}
 
export default Navbar;