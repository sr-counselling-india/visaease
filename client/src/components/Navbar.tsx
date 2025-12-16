"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
          VisaEase
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-textLight">
        <Link href="/#about" className="hover:text-primary transition-colors">About</Link>
        <Link href="/countries" className="hover:text-primary transition-colors">Destinations</Link>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <Link href="/login">
        <Button variant="ghost" size="sm">Sign In</Button>
      </Link>
    </nav>
  );
}
