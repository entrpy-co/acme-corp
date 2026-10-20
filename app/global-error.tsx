"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Replaces the root layout when the whole site fails, so it brings its own document and styling.
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        <title>Something went wrong · Acme Corp</title>
        <div className="bg-red-600 px-4 py-2 text-center text-sm font-medium text-white">
          Free shipping on orders over $100
        </div>
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-4 py-16">
          <Link href="/" className="mb-4 self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/acme-logo.png" alt="Acme" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-red-600">Something went wrong</p>
          <h1 className="text-3xl font-semibold tracking-tight">Sorry, the shop didn&rsquo;t load.</h1>
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
        </main>
      </body>
    </html>
  );
}
