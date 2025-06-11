'use client';

import React, { useState } from "react";
import VerticalNavbar from "@/components/VerticalNavbar";
import Header from "@/components/Header";
import Link from "next/link";

const AppFooter = () => (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-500 text-sm">
            <p>&copy; {new Date().getFullYear()} NoCapBoxd. All Rights Reserved.</p>
            <p className="mt-2">
                This is a personal project inspired by Letterboxd.
            </p>
            <div className="mt-4">
                <Link href="/about" className="hover:text-zinc-300 transition-colors">
                    Attribution
                </Link>
            </div>
        </div>
    </footer>
)

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <VerticalNavbar />
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-64 bg-[#0b090a] border-r border-gray-800 transform transition-transform duration-300 ease-in-out">
              <VerticalNavbar isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex-grow flex flex-col">
          <Header
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <main className="flex-grow px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
} 