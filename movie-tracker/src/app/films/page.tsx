'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { VscFilter, VscSearch, VscWarning } from 'react-icons/vsc';
import { fetcher } from '@/lib/tmdbClient';
import { Movie } from '@/types';
import MovieGridCard from '@/components/MovieGridCard';

const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
    {movies.map((movie) => (
      <MovieGridCard key={movie.id} movie={movie} />
    ))}
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
    {Array.from({ length: 18 }).map((_, i) => (
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
    <p className="text-gray-400">{error?.info?.status_message || 'Failed to load movies. Please try again later.'}</p>
  </div>
);

const NoResultsDisplay = ({ query }: { query?: string }) => (
  <div className="text-center py-16 animate-scale-in">
    <div className="text-6xl mb-4">🔍</div>
    <h2 className="text-2xl font-semibold text-white mb-2">No movies found</h2>
    <p className="text-gray-400">
      {query ? `No results for "${query}". Try a different search.` : 'No movies match your current filters.'}
    </p>
  </div>
);

export default function FilmsPage() {
  const [endpoint, setEndpoint] = useState('discover/movie');
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
  const categories = [
    { key: 'discover/movie', label: 'Popular' },
    { key: 'movie/top_rated', label: 'Top Rated' },
    { key: 'movie/now_playing', label: 'Now Playing' },
    { key: 'movie/upcoming', label: 'Upcoming' },
  ];

  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' }, 
    { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, 
    { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, 
    { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' }, 
    { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' }, 
    { id: 10770, name: 'TV Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, 
    { id: 37, name: 'Western' }
  ];

  const currentYear = new Date().getFullYear();
  const years = ['all', ...Array.from({ length: 50 }, (_, i) => currentYear - i)];

  const apiUrl = useMemo(() => {
    if (!apiKey) return null;

    let params = new URLSearchParams();

    if (searchQuery.length > 2) {
      params.append('query', searchQuery);
      return `https://api.themoviedb.org/3/search/movie?${params.toString()}`;
    }

    if (genre !== 'all') params.append('with_genres', genre);
    if (year !== 'all') params.append('primary_release_year', year);
    if (endpoint === 'discover/movie') {
      params.append('sort_by', 'popularity.desc');
    }
    
    return `https://api.themoviedb.org/3/${endpoint}?${params.toString()}`;
  }, [apiKey, endpoint, searchQuery, genre, year]);

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const displayMovies = data?.results || [];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-8 animate-fade-in-down">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-shadow">Discover Films</h1>
          <p className="text-gray-300">Browse movies by popularity, rating, and more.</p>
        </header>

        <div className="mb-8 sticky top-16 z-30 bg-[#141414]/80 backdrop-blur-md py-4 rounded-b-xl -mx-4 px-4">
          <div className="relative max-w-xl">
            <VscSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, e.g. 'Inception'..."
              className="w-full bg-gray-900/50 text-white pl-12 pr-4 py-3 rounded-full border-2 border-gray-700 focus:border-[#e5383b] focus:outline-none transition-all duration-200 focus-glow"
            />
          </div>
        </div>

        {!searchQuery && (
          <div className="mb-8 space-y-4 animate-fade-in-up">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setEndpoint(category.key)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm sm:text-base ${
                    endpoint === category.key ? 'bg-[#e5383b] text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2 text-gray-400">
                <VscFilter />
                <span>Filters:</span>
              </div>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-gray-800 text-white border-2 border-gray-700 rounded-full px-3 py-2 focus:border-[#e5383b] focus:outline-none transition-all duration-200 text-sm"
              >
                {genres.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-800 text-white border-2 border-gray-700 rounded-full px-3 py-2 focus:border-[#e5383b] focus:outline-none transition-all duration-200 text-sm"
              >
                {years.map((y) => (<option key={y} value={y}>{y === 'all' ? 'All Years' : y}</option>))}
              </select>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {searchQuery.length > 2 ? `Search results for "${searchQuery}"` : categories.find(c => c.key === endpoint)?.label || 'Movies'}
          </h2>
        </div>

        {isLoading && <LoadingSkeleton />}
        {error && <ErrorDisplay error={error} />}
        {!isLoading && !error && displayMovies.length === 0 && <NoResultsDisplay query={searchQuery} />}
        {!isLoading && !error && displayMovies.length > 0 && <MovieGrid movies={displayMovies} />}
        
        {displayMovies.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-800 hover:bg-[#e5383b] text-white rounded-lg transition-all duration-200 transform hover:scale-105">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 