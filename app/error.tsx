"use client"; // Error boundaries must be Client Components

import Link from "next/link";

// Shown inside the root layout, so the banner, header and footer stay in place.
export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-widest text-red-600">Something went wrong</p>
      <h1 className="text-3xl font-semibold tracking-tight">Sorry, this page didn&rsquo;t load.</h1>
      <p className="text-black/60">
        Our shop had a hiccup on its end. It&rsquo;s usually brief, so please try again in a moment.
      </p>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Reload
        </button>
        <Link href="/" className="text-sm text-black/60 underline underline-offset-4 hover:text-black">
          Back to the home page
        </Link>
      </div>
    </div>
  );
}
