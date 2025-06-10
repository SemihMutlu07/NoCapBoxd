'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { VscStarFull, VscFilter, VscSearch } from 'react-icons/vsc';
import { fetcher } from '@/lib/tmdbClient';
import { Movie } from '@/types';

export default function FilmsPage() {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const { data: moviesData, isLoading, error } = useSWR(
    `/movie/${selectedCategory}`,
    fetcher
  );

  const { data: searchResults } = useSWR(
    searchQuery.length > 2 ? `/search/movie?query=${encodeURIComponent(searchQuery)}` : null,
    fetcher
  );

  const categories = [
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'upcoming', label: 'Upcoming' },
  ];

  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 16, name: 'Animation' },
    { id: 99, name: 'Documentary' },
  ];

  const currentYear = new Date().getFullYear();
  const years = ['all', ...Array.from({ length: 30 }, (_, i) => currentYear - i)];

  const displayMovies = searchQuery.length > 2 
    ? searchResults?.results || []
    : moviesData?.results || [];

  const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
    <Link href={`/film/${movie.id}`} className="group">
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="w-full rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay with movie info */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 rounded-lg flex items-end">
          <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
            <h3 className="font-semibold text-white mb-1 line-clamp-2">{movie.title}</h3>
            <p className="text-gray-300 text-sm mb-2">
              {new Date(movie.release_date).getFullYear()}
            </p>
            <div className="flex items-center space-x-1">
              <VscStarFull className="text-yellow-500" size={14} />
              <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="font-medium text-white group-hover:text-[#e5383b] transition-colors line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </Link>
  );

  const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-800 rounded animate-pulse w-2/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Discover Films</h1>
          <p className="text-gray-400">
            Explore thousands of movies and find your next favorite
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <VscSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-[#e5383b] focus:outline-none"
            />
          </div>
        </div>

        {/* Filters and Categories */}
        {!searchQuery && (
          <div className="mb-8 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-[#e5383b] text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <VscFilter className="text-gray-400" />
                <span className="text-gray-400 text-sm">Filters:</span>
              </div>

              {/* Genre Filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-[#e5383b] focus:outline-none"
              >
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-[#e5383b] focus:outline-none"
              >
                <option value="all">All Years</option>
                {years.slice(1).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {searchQuery.length > 2 
              ? `Search results for "${searchQuery}"` 
              : categories.find(c => c.key === selectedCategory)?.label || 'Movies'
            }
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {displayMovies.length} movies found
          </p>
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-semibold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400">Failed to load movies. Please try again later.</p>
          </div>
        ) : displayMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-white mb-2">No movies found</h2>
            <p className="text-gray-400">
              {searchQuery.length > 2 
                ? 'Try adjusting your search terms'
                : 'No movies match your current filters'
              }
            </p>
          </div>
        ) : (
          <MovieGrid movies={displayMovies} />
        )}

        {/* Load More */}
        {displayMovies.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              Load More Movies
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-16 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Platform Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#e5383b]">50K+</div>
              <div className="text-sm text-gray-400">Movies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#e5383b]">25K+</div>
              <div className="text-sm text-gray-400">Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#e5383b]">10K+</div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#e5383b]">150K+</div>
              <div className="text-sm text-gray-400">Ratings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 