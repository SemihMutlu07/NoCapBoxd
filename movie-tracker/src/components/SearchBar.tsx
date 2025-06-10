'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VscSearch, VscClose } from 'react-icons/vsc';
import Link from 'next/link';
import Image from 'next/image';
import { Movie, User } from '@/types';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for films, people..." 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{movies: Movie[], users: User[]}>({ movies: [], users: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulated search - replace with actual API call
      setTimeout(() => {
        setResults({
          movies: [
            { id: 1, title: 'The Matrix', poster_path: '/poster1.jpg', overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality.', release_date: '1999-03-31', vote_average: 8.7, vote_count: 15000 },
            { id: 2, title: 'Inception', poster_path: '/poster2.jpg', overview: 'A thief who steals corporate secrets through dream-sharing technology.', release_date: '2010-07-16', vote_average: 8.8, vote_count: 18000 }
          ],
          users: [
            { id: '1', username: 'moviebuff', name: 'Movie Buff', joinedDate: '2023-01-01', totalFilms: 150, totalReviews: 45, following: 20, followers: 35 }
          ]
        });
        setIsLoading(false);
        setShowResults(true);
      }, 300);
    } else {
      setResults({ movies: [], users: [] });
      setShowResults(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults({ movies: [], users: [] });
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <VscSearch className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-gray-800 text-white pl-12 pr-12 py-3 rounded-full border border-gray-700 focus:border-[#e5383b] focus:outline-none transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 text-gray-400 hover:text-white"
            >
              <VscClose size={20} />
            </button>
          )}
        </div>
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : (
            <>
              {results.movies.length > 0 && (
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-300 px-3 py-2">Films</h3>
                  {results.movies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/film/${movie.id}`}
                      className="flex items-center p-3 hover:bg-gray-800 rounded-lg"
                      onClick={() => setShowResults(false)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        width={40}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-white">{movie.title}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(movie.release_date).getFullYear()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {results.users.length > 0 && (
                <div className="p-2 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-300 px-3 py-2">People</h3>
                  {results.users.map((user) => (
                    <Link
                      key={user.id}
                      href={`/u/${user.username}`}
                      className="flex items-center p-3 hover:bg-gray-800 rounded-lg"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">@{user.username}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {results.movies.length === 0 && results.users.length === 0 && !isLoading && (
                <div className="p-4 text-center text-gray-400">No results found</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 