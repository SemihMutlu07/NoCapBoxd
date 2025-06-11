'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VscSearch, VscClose } from 'react-icons/vsc';
import Link from 'next/link';
import Image from 'next/image';
import { Movie, User } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import ImageWithFallback from './ImageWithFallback';

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
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const search = async () => {
      if (debouncedQuery.length > 2) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/tmdb/search?query=${debouncedQuery}`);
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error('Failed to fetch search results:', error);
          setResults({ movies: [], users: [] });
        } finally {
          setIsLoading(false);
          setShowResults(true);
        }
      } else {
        setResults({ movies: [], users: [] });
        setShowResults(false);
      }
    };

    search();
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults({ movies: [], users: [] });
    setShowResults(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.length > 2 && (results.movies.length > 0 || results.users.length > 0)) {
      setShowResults(true);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setIsFocused(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-300 ${
          isFocused ? 'transform scale-105' : ''
        }`}>
          <VscSearch className={`absolute left-3 sm:left-4 transition-colors duration-200 ${
            isFocused ? 'text-[#e5383b]' : 'text-gray-400'
          }`} size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder={placeholder}
            className={`w-full bg-gray-800/80 backdrop-blur-sm text-white pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-full border-2 transition-all duration-300 focus:outline-none focus-glow hover-glow ${
              isFocused 
                ? 'border-[#e5383b] bg-gray-800' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 sm:right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
            >
              <VscClose size={16} />
            </button>
          )}
        </div>
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-fade-in-down">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-[#e5383b] border-t-transparent rounded-full mx-auto mb-2"></div>
              <div className="text-gray-400 text-sm">Searching...</div>
            </div>
          ) : (
            <>
              {results.movies.length > 0 && (
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-300 px-3 py-2 border-b border-gray-700 mb-2">
                    Films
                  </h3>
                  {results.movies.map((movie, index) => (
                    <Link
                      key={movie.id}
                      href={`/film/${movie.id}`}
                      className="flex items-center p-3 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:translate-x-1 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={handleResultClick}
                    >
                      <div className="relative flex-shrink-0">
                        <ImageWithFallback
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          width={40}
                          height={60}
                          className="rounded object-cover shadow-md"
                          fallbackType="movie"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded transition-opacity hover:opacity-0"></div>
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="font-medium text-white line-clamp-1">{movie.title}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          {movie.release_date && new Date(movie.release_date).getFullYear()} • ⭐ {(movie.vote_average / 2).toFixed(1)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {results.users.length > 0 && (
                <div className="p-2 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-300 px-3 py-2 border-b border-gray-700 mb-2">
                    People
                  </h3>
                  {results.users.map((user, index) => (
                    <Link
                      key={user.id}
                      href={`/u/${user.username}`}
                      className="flex items-center p-3 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:translate-x-1 animate-fade-in-up"
                      style={{ animationDelay: `${(results.movies.length + index) * 50}ms` }}
                      onClick={handleResultClick}
                    >
                      <div className="relative flex-shrink-0 w-10 h-10">
                        <ImageWithFallback
                          src={`https://image.tmdb.org/t/p/w185${(user as any).profile_path}`}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                          fallbackType="person"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">
                          @{user.username} • {user.totalFilms} films
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {results.movies.length === 0 && results.users.length === 0 && !isLoading && (
                <div className="p-6 text-center animate-fade-in-up">
                  <div className="text-gray-400 mb-2">No results found</div>
                  <div className="text-sm text-gray-500">
                    Try searching for a different film or person
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 