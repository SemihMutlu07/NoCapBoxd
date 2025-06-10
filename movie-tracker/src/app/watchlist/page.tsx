'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VscTrash, VscEye, VscStarFull, VscFilter, VscSearch } from 'react-icons/vsc';
import { Movie, WatchlistItem } from '@/types';

export default function WatchlistPage() {
  const [sortBy, setSortBy] = useState<'added' | 'title' | 'year' | 'rating'>('added');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock watchlist data - replace with actual API call
  const watchlistItems: (WatchlistItem & { movie: Movie })[] = [
    {
      movieId: 1,
      movieTitle: 'Dune: Part Two',
      posterPath: '/poster1.jpg',
      addedAt: '2024-01-15T10:30:00Z',
      movie: {
        id: 1,
        title: 'Dune: Part Two',
        poster_path: '/poster1.jpg',
        overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        release_date: '2024-03-01',
        vote_average: 8.7,
        vote_count: 15000,
        genres: [{ id: 1, name: 'Sci-Fi' }, { id: 2, name: 'Adventure' }]
      }
    },
    {
      movieId: 2,
      movieTitle: 'The Batman',
      posterPath: '/poster2.jpg',
      addedAt: '2024-01-10T14:15:00Z',
      movie: {
        id: 2,
        title: 'The Batman',
        poster_path: '/poster2.jpg',
        overview: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City.',
        release_date: '2022-03-04',
        vote_average: 7.8,
        vote_count: 12000,
        genres: [{ id: 3, name: 'Action' }, { id: 4, name: 'Crime' }]
      }
    },
    {
      movieId: 3,
      movieTitle: 'Everything Everywhere All at Once',
      posterPath: '/poster3.jpg',
      addedAt: '2024-01-05T09:45:00Z',
      movie: {
        id: 3,
        title: 'Everything Everywhere All at Once',
        poster_path: '/poster3.jpg',
        overview: 'An aging Chinese immigrant is swept up in an insane adventure.',
        release_date: '2022-03-25',
        vote_average: 8.9,
        vote_count: 18000,
        genres: [{ id: 5, name: 'Comedy' }, { id: 6, name: 'Fantasy' }]
      }
    }
  ];

  const genres = ['all', 'Sci-Fi', 'Action', 'Comedy', 'Drama', 'Thriller'];

  const filteredAndSortedItems = watchlistItems
    .filter(item => {
      const matchesSearch = item.movieTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = filterGenre === 'all' || 
        item.movie.genres?.some(genre => genre.name === filterGenre);
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.movieTitle.localeCompare(b.movieTitle);
        case 'year':
          return new Date(b.movie.release_date).getFullYear() - new Date(a.movie.release_date).getFullYear();
        case 'rating':
          return b.movie.vote_average - a.movie.vote_average;
        case 'added':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

  const handleRemoveFromWatchlist = (movieId: number) => {
    // Here you would make an API call to remove from watchlist
    console.log('Removing movie from watchlist:', movieId);
  };

  const handleMarkAsWatched = (movieId: number) => {
    // Here you would make an API call to mark as watched
    console.log('Marking movie as watched:', movieId);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Watchlist</h1>
          <p className="text-gray-400">
            {watchlistItems.length} films • {filteredAndSortedItems.length} showing
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <VscSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your watchlist..."
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-[#e5383b] focus:outline-none"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <VscFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-[#e5383b] focus:outline-none"
              >
                <option value="added">Date Added</option>
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Genre Filter */}
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-[#e5383b] focus:outline-none"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Watchlist Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {watchlistItems.length === 0 ? 'Your watchlist is empty' : 'No films match your filters'}
            </h2>
            <p className="text-gray-400 mb-6">
              {watchlistItems.length === 0 
                ? 'Start building your watchlist by adding films you want to watch'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {watchlistItems.length === 0 && (
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-[#e5383b] hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Discover Films
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems.map((item) => (
              <div key={item.movieId} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group">
                <div className="flex">
                  {/* Poster */}
                  <Link href={`/film/${item.movieId}`} className="flex-shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${item.movie.poster_path}`}
                      alt={item.movieTitle}
                      width={120}
                      height={180}
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1">
                      <Link
                        href={`/film/${item.movieId}`}
                        className="font-semibold text-white hover:text-[#e5383b] transition-colors line-clamp-2"
                      >
                        {item.movieTitle}
                      </Link>
                      
                      <p className="text-sm text-gray-400 mb-2">
                        {new Date(item.movie.release_date).getFullYear()}
                      </p>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <VscStarFull className="text-yellow-500" size={14} />
                          <span className="text-sm text-gray-300">
                            {item.movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                        {item.movie.genres && (
                          <div className="flex flex-wrap gap-1">
                            {item.movie.genres.slice(0, 2).map((genre) => (
                              <span
                                key={genre.id}
                                className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {item.movie.overview}
                      </p>

                      <p className="text-xs text-gray-500">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-700">
                      <button
                        onClick={() => handleMarkAsWatched(item.movieId)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                      >
                        <VscEye size={14} />
                        <span>Watched</span>
                      </button>
                      
                      <button
                        onClick={() => handleRemoveFromWatchlist(item.movieId)}
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                      >
                        <VscTrash size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {filteredAndSortedItems.length > 0 && (
          <div className="mt-12 bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Watchlist Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#e5383b]">
                  {watchlistItems.length}
                </div>
                <div className="text-sm text-gray-400">Total Films</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#e5383b]">
                  {Math.round(watchlistItems.reduce((acc, item) => acc + item.movie.vote_average, 0) / watchlistItems.length * 10) / 10}
                </div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#e5383b]">
                  {Math.round(watchlistItems.reduce((acc, item) => acc + (item.movie.runtime || 120), 0) / 60)}h
                </div>
                <div className="text-sm text-gray-400">Est. Runtime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#e5383b]">
                  {new Set(watchlistItems.flatMap(item => item.movie.genres?.map(g => g.name) || [])).size}
                </div>
                <div className="text-sm text-gray-400">Genres</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 