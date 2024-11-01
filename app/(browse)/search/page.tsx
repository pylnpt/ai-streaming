import { redirect } from "next/navigation";
import { Feeds, FeedsSkeleton } from "./_components/feeds";
import { Suspense } from "react";


interface SearchPageProps {
    searchParams: {
         term?: string;
    }
}

const SearchPage = ({
    searchParams
}: SearchPageProps) => {
    if(!searchParams.term) {
        redirect("/");
    }
    return ( 
    <div className="h-full p-8 max-w-screen-xl mx-auto">
        <Suspense fallback={<FeedsSkeleton />}>
            <Feeds term={searchParams.term}/>
        </Suspense>
    </div> );
}
 
export default SearchPage;