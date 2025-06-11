'use client';

import React from 'react';
import Link from 'next/link';
import { VscBell, VscAccount, VscMenu } from 'react-icons/vsc';
import SearchBar from './SearchBar';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, isMobileMenuOpen = false }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b090a]/95 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={onMobileMenuToggle}
              className={`p-2 text-gray-400 hover:text-white transition-all duration-200 hover:bg-gray-800 rounded-lg transform ${
                isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <VscMenu size={24} />
            </button>
          </div>

          {/* Logo - Mobile */}
          <Link href="/" className="flex items-center space-x-2 lg:hidden">
            <div className="font-bold text-xl text-[#e5383b] transition-all duration-200 hover:scale-105">
              Letterboxd
            </div>
          </Link>

          {/* Logo - Desktop */}
          <Link href="/" className="hidden lg:flex items-center space-x-2">
            <div className="font-bold text-2xl text-[#e5383b] transition-all duration-200 hover:scale-105">
              Letterboxd
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Button - Mobile */}
            <button className="p-2 text-gray-400 hover:text-white transition-all duration-200 hover:bg-gray-800 rounded-lg md:hidden">
              <VscBell size={20} />
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-white transition-all duration-200 hover:bg-gray-800 rounded-lg transform hover:scale-110">
              <VscBell size={20} />
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white transition-all duration-200 hover:bg-gray-800 rounded-lg transform hover:scale-105">
                <VscAccount size={20} />
                <span className="hidden sm:block text-sm font-medium">Profile</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link
                    href="/u/semihmutlu"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    <div className="flex items-center space-x-2">
                      <VscAccount size={16} />
                      <span>Your Profile</span>
                    </div>
                  </Link>
                  <Link
                    href="/watchlist"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    Your Watchlist
                  </Link>
                  <Link
                    href="/reviews"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    Your Reviews
                  </Link>
                  <Link
                    href="/lists"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    Your Lists
                  </Link>
                  <div className="border-t border-gray-700 my-2"></div>
                  <Link
                    href="/settings"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    Settings
                  </Link>
                  <button className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:translate-x-1">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header; 