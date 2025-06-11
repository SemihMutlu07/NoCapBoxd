'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { VscFilter, VscSearch, VscWarning } from 'react-icons/vsc';
import { fetcher } from '@/lib/tmdbClient';
import MovieGridCard from '@/components/MovieGridCard';
import { Movie } from '@/types';

const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="space-y-3 animate-pulse">
        <div className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
        <div className="h-4 bg-gray-800 rounded"></div>
        <div className="h-3 bg-gray-800 rounded w-2/3"></div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = ({ error }: { error: any }) => (
  <div className="text-center py-16 animate-scale-in">
    <VscWarning className="text-[#e5383b] text-5xl mx-auto mb-4" />
    <h2 className="text-2xl font-semibold text-white mb-2">Something went wrong</h2>
    <p className="text-gray-400">{error?.info?.status_message || 'Failed to load watchlist. Please try again later.'}</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 animate-scale-in">
    <div className="text-6xl mb-4">🎬</div>
    <h2 className="text-2xl font-semibold text-white mb-2">Your watchlist is empty</h2>
    <p className="text-gray-400 mb-6">Add movies to your watchlist to see them here.</p>
    <Link
      href="/films"
      className="inline-flex items-center px-6 py-3 bg-[#e5383b] hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
    >
      Discover Films
    </Link>
  </div>
);

export default function WatchlistPage() {
  const [sortBy, setSortBy] = useState<'created_at.desc' | 'created_at.asc' | 'vote_average.desc'>('created_at.desc');
  const [searchQuery, setSearchQuery] = useState('');

  // Replace with dynamic user ID
  const MOCK_ACCOUNT_ID = '21479836';
  
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = apiKey ? `https://api.themoviedb.org/3/account/${MOCK_ACCOUNT_ID}/watchlist/movies?sort_by=${sortBy}` : null;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  const watchlistItems = useMemo(() => {
    if (!data?.results) return [];
    if (searchQuery.length < 2) return data.results;
    
    return data.results.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-shadow">Your Watchlist</h1>
          <p className="text-gray-400">
            {isLoading ? 'Loading movies...' : `${watchlistItems.length} films to watch`}
          </p>
        </header>

        <div className="mb-8 p-4 bg-gray-900/50 rounded-xl flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <VscSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your watchlist..."
              className="w-full bg-gray-800/80 text-white pl-12 pr-4 py-3 rounded-full border-2 border-gray-700 focus:border-[#e5383b] focus:outline-none transition-all duration-200 focus-glow"
            />
          </div>
          <div className="flex items-center space-x-2">
            <VscFilter className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-800 text-white border-2 border-gray-700 rounded-full px-3 py-2.5 focus:border-[#e5383b] focus:outline-none transition-all"
            >
              <option value="created_at.desc">Date Added (Newest)</option>
              <option value="created_at.asc">Date Added (Oldest)</option>
              <option value="vote_average.desc">Rating</option>
            </select>
          </div>
        </div>

        {isLoading && <LoadingSkeleton />}
        {error && <ErrorDisplay error={error} />}
        {!isLoading && !error && watchlistItems.length === 0 && <EmptyState />}
        
        {!isLoading && !error && watchlistItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlistItems.map((movie: Movie) => (
              <MovieGridCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 