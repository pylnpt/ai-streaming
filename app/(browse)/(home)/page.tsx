import { Suspense } from "react";
import Link from "next/link";
import { Feeds, FeedsSkeleton } from "./_components/feeds";


export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 p-8 max-w-screen-2xl mr-auto w-full">
        <Suspense fallback={<FeedsSkeleton/>}>
          <Feeds />
        </Suspense>
      </div>
      <footer className="border-t border-border px-8 py-4 text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>© {new Date().getFullYear()} StreamWithAI</span>
        <span aria-hidden>·</span>
        <Link href="/terms" className="hover:text-primary transition">ÁSZF</Link>
        <span aria-hidden>·</span>
        <Link href="/privacy" className="hover:text-primary transition">Adatvédelmi tájékoztató</Link>
      </footer>
    </div>
  );
}
