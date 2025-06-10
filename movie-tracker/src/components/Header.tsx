'use client';

import React from 'react';
import Link from 'next/link';
import { VscBell, VscAccount } from 'react-icons/vsc';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b090a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-[#e5383b]">Letterboxd</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <VscBell size={20} />
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white transition-colors">
                <VscAccount size={20} />
                <span className="hidden md:block">Profile</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/u/semihmutlu"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/watchlist"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Watchlist
                  </Link>
                  <Link
                    href="/reviews"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Your Reviews
                  </Link>
                  <Link
                    href="/lists"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Your Lists
                  </Link>
                  <div className="border-t border-gray-700 my-2"></div>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Settings
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 