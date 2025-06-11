'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Movie, Credits } from '@/types';

type Tab = 'cast' | 'crew' | 'details' | 'genres';

interface MovieDetailTabsProps {
  movie: Movie;
  credits: Credits;
  mpaaRating: string | null;
}

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-full ${
      isActive ? 'bg-[#e5383b] text-white' : 'text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200'
    }`}
  >
    {label}
  </button>
);

const CastGrid: React.FC<{ credits: Credits }> = ({ credits }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {credits.cast.map(member => (
      <div key={member.id} className="text-center">
        <div className="w-full aspect-square rounded-full overflow-hidden bg-zinc-800 mb-2">
          {member.profile_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
              alt={member.name}
              width={185}
              height={185}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <p className="text-white font-medium">{member.name}</p>
        <p className="text-sm text-zinc-400">{member.character}</p>
      </div>
    ))}
  </div>
);

const CrewGrid: React.FC<{ credits: Credits }> = ({ credits }) => {
  // Group by name to avoid duplicates
  const crewMap = new Map<string, { name: string; jobs: string[]; profile_path: string | null }>();
  credits.crew.forEach(member => {
    if (crewMap.has(member.name)) {
      crewMap.get(member.name)?.jobs.push(member.job);
    } else {
      crewMap.set(member.name, { name: member.name, jobs: [member.job], profile_path: member.profile_path });
    }
  });
  const uniqueCrew = Array.from(crewMap.values());

  return(
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {uniqueCrew.map(member => (
      <div key={member.name} className="text-center">
        <div className="w-full aspect-square rounded-full overflow-hidden bg-zinc-800 mb-2">
          {member.profile_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
              alt={member.name}
              width={185}
              height={185}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <p className="text-white font-medium">{member.name}</p>
        <p className="text-sm text-zinc-400">{member.jobs.join(', ')}</p>
      </div>
    ))}
  </div>
  )
};

const DetailsTab: React.FC<{ movie: Movie; mpaaRating: string | null }> = ({ movie, mpaaRating }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
    <div className="bg-zinc-800/50 p-4 rounded-lg">
      <p className="text-zinc-400 mb-1">Release Date</p>
      <p className="text-white font-semibold">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    <div className="bg-zinc-800/50 p-4 rounded-lg">
      <p className="text-zinc-400 mb-1">Runtime</p>
      <p className="text-white font-semibold">{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</p>
    </div>
    <div className="bg-zinc-800/50 p-4 rounded-lg">
      <p className="text-zinc-400 mb-1">Rating</p>
      <p className="text-white font-semibold">{mpaaRating || 'Not Rated'}</p>
    </div>
    <div className="bg-zinc-800/50 p-4 rounded-lg">
      <p className="text-zinc-400 mb-1">Vote Average</p>
      <p className="text-white font-semibold">{movie.vote_average.toFixed(1)} / 10</p>
    </div>
    <div className="bg-zinc-800/50 p-4 rounded-lg">
      <p className="text-zinc-400 mb-1">Vote Count</p>
      <p className="text-white font-semibold">{movie.vote_count.toLocaleString()}</p>
    </div>
  </div>
);

const GenresTab: React.FC<{ movie: Movie }> = ({ movie }) => (
    <div className="flex flex-wrap gap-3">
        {movie.genres?.map(genre => (
            <div key={genre.id} className="px-4 py-2 bg-zinc-700/50 rounded-full text-zinc-200 font-medium">
                {genre.name}
            </div>
        ))}
    </div>
);


export default function MovieDetailTabs({ movie, credits, mpaaRating }: MovieDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('cast');

  return (
    <div className="mt-8">
      <div className="p-2 bg-zinc-800/50 rounded-full flex items-center gap-2 mb-6 max-w-sm">
        <TabButton label="Cast" isActive={activeTab === 'cast'} onClick={() => setActiveTab('cast')} />
        <TabButton label="Crew" isActive={activeTab === 'crew'} onClick={() => setActiveTab('crew')} />
        <TabButton label="Details" isActive={activeTab === 'details'} onClick={() => setActiveTab('details')} />
        <TabButton label="Genres" isActive={activeTab === 'genres'} onClick={() => setActiveTab('genres')} />
      </div>

      <div>
        {activeTab === 'cast' && <CastGrid credits={credits} />}
        {activeTab === 'crew' && <CrewGrid credits={credits} />}
        {activeTab === 'details' && <DetailsTab movie={movie} mpaaRating={mpaaRating} />}
        {activeTab === 'genres' && <GenresTab movie={movie} />}
      </div>
    </div>
  );
} 