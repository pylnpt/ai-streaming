"use client"

import qs from "query-string";
import {useState} from "react";
import { SearchIcon , X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
    const router = useRouter();
    const[value, setValue] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value) return;

        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, { skipEmptyString: true });

        router.push(url);
    }

    const onClear = () => { setValue("") };



    return (
    <>
        <form 
            className="relative w-full lg:w-[400px] flex items-center"
            onSubmit={onSubmit}>
                <Input placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent
                        focus-visible:ring-offset-0 border-primary"/>
                {value &&(
                    <X onClick={onClear}
                        className="border-2 border-primary absolute  right-10 h-10 w-10 
                            text-primary cursor-pointer 
                            hover:opacity-75 transition"/>
                )}
                <Button type="submit"
                    size="sm"
                    variant="primary"
                    className="w-10 h-10 border-2 border-primary">
                    <SearchIcon className="h-5 w-5 text-bg"/>
                </Button>
        </form>
    </>
    );
}
 
export default SearchBar;