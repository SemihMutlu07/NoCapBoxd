'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { VscStarFull, VscAdd, VscCheck, VscWarning } from 'react-icons/vsc';
import { fetcher } from '@/lib/tmdbClient';
import { Movie as MovieType } from '@/types';
import ImageWithFallback from './ImageWithFallback';

type MovieRailProps = {
  endpoint: string;
};

const MovieCard = ({ movie, index }: { movie: MovieType, index: number }) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWatchlisted(!isWatchlisted);
  };

  const formatRating = (rating: number) => (rating / 2).toFixed(1);

  return (
    <Link
      href={`/film/${movie.id}`}
      className="group animate-fade-in-up hover-lift"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
        <ImageWithFallback
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={`${movie.title} poster`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex justify-between items-end">
            <div className="flex items-center space-x-1">
              <VscStarFull className="text-yellow-400" />
              <span className="text-white text-sm font-semibold">{formatRating(movie.vote_average)}</span>
            </div>
            <button
              onClick={toggleWatchlist}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isWatchlisted ? 'bg-[#e5383b] text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isWatchlisted ? <VscCheck size={14} /> : <VscAdd size={14} />}
            </button>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm sm:text-base font-semibold line-clamp-2 text-white group-hover:text-[#e5383b] transition-colors duration-200">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
};

const MovieRailSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse space-y-2">
        <div className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6"></div>
      </div>
    ))}
  </div>
);

const MovieRailError = ({ error }: { error: any }) => (
  <div className="flex items-center justify-center w-full h-60 bg-gray-800/50 rounded-lg p-4 animate-scale-in">
    <div className="text-center">
      <VscWarning className="text-[#e5383b] text-4xl mx-auto mb-2" />
      <p className="text-[#e5383b] font-semibold">Failed to load movies</p>
      <p className="text-gray-400 text-sm mt-1">
        {error.info?.status_message || error.message}
      </p>
    </div>
  </div>
);

export default function MovieRail({ endpoint }: MovieRailProps) {
  const url = `/api/tmdb/movies?endpoint=${endpoint}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) {
    return <MovieRailSkeleton />;
  }

  if (error) {
    return <MovieRailError error={error} />;
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No movies found for this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.results.map((movie: MovieType, index: number) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}