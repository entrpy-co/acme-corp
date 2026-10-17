import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acme Corp",
  description: "Quality goods for ambitious plans since 1949.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4 text-sm">
            <Link href="/" className="mr-auto text-base font-semibold tracking-tight">
              ACME<span className="text-red-600">.</span>
            </Link>
            <Link href="/" className="text-black/60 hover:text-black">Products</Link>
            <Link href="/pricing" className="text-black/60 hover:text-black">Pricing</Link>
            <Link href="/about" className="text-black/60 hover:text-black">About</Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-black/10">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-black/50">
            Acme Corp. A test business for Foreman. Nothing here is for sale.
          </div>
        </footer>
      </body>
    </html>
  );
}
