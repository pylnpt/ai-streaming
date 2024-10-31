import { Suspense } from "react";
import { Feeds, FeedsSkeleton } from "./_components/feeds";


export default function Home() {
  return (
    <>
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<FeedsSkeleton/>}>
        <Feeds />
      </Suspense>
    </div> 
    </> 
  );
}
