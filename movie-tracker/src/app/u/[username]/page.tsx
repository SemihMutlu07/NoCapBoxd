'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { VscCalendar, VscEye, VscHeart, VscStarFull, VscAdd, VscCheck, VscRss } from 'react-icons/vsc';
import MovieRail from '@/components/MovieRail';
import { fetcher } from '@/lib/tmdbClient';
import { User, Movie } from '@/types';

// Mock user data - replace with actual API call
const mockUser: User = {
  id: '1',
  name: 'Semih Mutlu',
  username: 'semihmutlu',
  bio: 'Film lover, critic, and storyteller. Navigating the vast universe of cinema one frame at a time.',
  joinedDate: '2022-03-15',
  totalFilms: 1247,
  totalReviews: 89,
  following: 156,
  followers: 324,
};

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-gray-900/50 rounded-xl p-4 text-center transform transition-all duration-300 hover:bg-gray-800 hover:scale-105">
    <div className="flex justify-center mb-2 text-[#e5383b]">{icon}</div>
    <div className="text-xl md:text-2xl font-bold text-white mb-1">{value.toLocaleString()}</div>
    <div className="text-xs sm:text-sm text-gray-400">{label}</div>
  </div>
);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 sm:px-6 py-3 font-medium transition-colors duration-200 text-sm sm:text-base ${
      isActive ? 'text-white border-b-2 border-[#e5383b]' : 'text-gray-400 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const UserLists: React.FC = () => (
  <div className="space-y-4">
    {['Sci-Fi Masterpieces', 'Best of 2023', 'Underrated Gems', 'All-Time Favorites'].map((listName, index) => (
      <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
        <h3 className="text-lg font-semibold text-white mb-2">{listName}</h3>
        <p className="text-gray-400 text-sm mb-4">25 films • Updated 2 days ago</p>
      </div>
    ))}
  </div>
);

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [activeTab, setActiveTab] = useState<'films' | 'reviews' | 'watchlist' | 'lists'>('films');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Replace with dynamic user ID
  const MOCK_ACCOUNT_ID = '21479836';
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const { data: favoriteMovies } = useSWR(
    apiKey ? `https://api.themoviedb.org/3/account/${MOCK_ACCOUNT_ID}/favorite/movies` : null,
    fetcher
  );

  const { data: ratedMovies } = useSWR(
    apiKey ? `https://api.themoviedb.org/3/account/${MOCK_ACCOUNT_ID}/rated/movies` : null,
    fetcher
  );
  
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-b from-gray-900 to-[#141414] py-8 sm:py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {mockUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{mockUser.name}</h1>
              <p className="text-lg text-gray-400 mb-3">@{mockUser.username}</p>
              <p className="text-gray-300 mb-4 max-w-2xl">{mockUser.bio}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1.5"><VscCalendar /><span>Joined {new Date(mockUser.joinedDate).toLocaleDateString()}</span></div>
                <div className="flex items-center space-x-1.5"><VscRss /><span>{mockUser.followers.toLocaleString()} followers</span></div>
              </div>
            </div>
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-300 w-32 justify-center ${
                isFollowing 
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-[#e5383b] hover:bg-red-600 text-white'
              }`}
            >
              {isFollowing ? <VscCheck /> : <VscAdd />}
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12">
          <StatCard label="Films Watched" value={mockUser.totalFilms} icon={<VscEye size={24} />} />
          <StatCard label="Reviews" value={mockUser.totalReviews} icon={<VscStarFull size={24} />} />
          <StatCard label="Following" value={mockUser.following} icon={<VscHeart size={24} />} />
          <StatCard label="Lists" value={12} icon={<VscAdd size={24} />} />
        </div>

        <div className="border-b border-gray-700 mb-8">
          <div className="flex flex-wrap -mb-px">
            <TabButton label="Films" isActive={activeTab === 'films'} onClick={() => setActiveTab('films')} />
            <TabButton label="Reviews" isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            <TabButton label="Watchlist" isActive={activeTab === 'watchlist'} onClick={() => setActiveTab('watchlist')} />
            <TabButton label="Lists" isActive={activeTab === 'lists'} onClick={() => setActiveTab('lists')} />
          </div>
        </div>
        
        <div className="min-h-[400px]">
          {activeTab === 'films' && (
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-white">Favorite Films</h2>
                <MovieRail endpoint={`account/${MOCK_ACCOUNT_ID}/favorite/movies`} />
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-white">Recently Rated</h2>
                <MovieRail endpoint={`account/${MOCK_ACCOUNT_ID}/rated/movies`} />
              </section>
            </div>
          )}
          {activeTab === 'watchlist' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white">Watchlist</h2>
              <MovieRail endpoint={`account/${MOCK_ACCOUNT_ID}/watchlist/movies`} />
            </div>
          )}
          {activeTab === 'reviews' && (
              <div className="text-center py-16 text-gray-500">Reviews coming soon...</div>
          )}
          {activeTab === 'lists' && <UserLists />}
        </div>
      </div>
    </div>
  );
}