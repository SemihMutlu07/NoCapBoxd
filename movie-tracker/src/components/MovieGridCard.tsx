'use client';

import React from 'react';
import Link from 'next/link';
import { VscStarFull } from 'react-icons/vsc';
import { BsBookmark, BsBookmarkFill, BsCheck, BsCheckAll } from 'react-icons/bs';
import { Movie } from '@/types';
import ImageWithFallback from './ImageWithFallback';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useWatchedList } from '@/hooks/useWatchedList';

const MovieGridCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { isMovieInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isMovieInWatchedList, addToWatchedList, removeFromWatchedList } = useWatchedList();

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMovieInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  const handleWatchedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMovieInWatchedList(movie.id)) {
      removeFromWatchedList(movie.id);
    } else {
      addToWatchedList(movie.id, null);
    }
  };

  return (
    <Link href={`/film/${movie.id}`} className="group animate-scale-in">
      <div className="relative aspect-[2/3] w-full">
        <ImageWithFallback
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          fill
          className="rounded-lg object-cover shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 15vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-between p-2">
          <div className="flex justify-end space-x-2">
            <button onClick={handleWatchedClick} className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors">
              {isMovieInWatchedList(movie.id) ? <BsCheckAll size={20} /> : <BsCheck size={20} />}
            </button>
            <button onClick={handleWatchlistClick} className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors">
              {isMovieInWatchlist(movie.id) ? <BsBookmarkFill size={20} /> : <BsBookmark size={20} />}
            </button>
          </div>
          <div className="w-full p-2">
            <h3 className="font-semibold text-white mb-1 line-clamp-2">{movie.title}</h3>
            <div className="flex items-center space-x-1">
              <VscStarFull className="text-yellow-400" size={14} />
              <span className="text-white text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-white group-hover:text-[#e5383b] transition-colors line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm">{new Date(movie.release_date).getFullYear()}</p>
      </div>
    </Link>
  );
};

export default MovieGridCard; 