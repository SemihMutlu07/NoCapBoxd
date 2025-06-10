import React from 'react';
import Image from 'next/image';
import { Movie as MovieType } from '@/types';

// Define the props type for the component
type MovieRailProps = {
  movies: MovieType[];
};

const MovieRail = ({ movies }: MovieRailProps) => {
  return (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {movies.map((movie) => (
        <div key={movie.id} className="flex-shrink-0 w-40">
          <Image
            src={movie.posterUrl || `https://image.tmdb.org/t/p/w342${movie.poster_path}` || '/placeholder-poster.jpg'}
            alt={`Poster for ${movie.title}`}
            width={160}
            height={240}
            className="w-full h-60 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
          />
          <h3 className="text-sm font-semibold mt-2 truncate text-white">
            {movie.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default MovieRail;