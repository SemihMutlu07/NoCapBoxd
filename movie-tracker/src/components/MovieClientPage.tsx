'use client';

import { VscHeart } from 'react-icons/vsc';
import { BsBookmark, BsBookmarkFill, BsCheck, BsCheckAll } from 'react-icons/bs';
import { StarRating } from '@/components/StarRating';
import MovieDetailTabs from '@/components/MovieDetailTabs';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useWatchedList } from '@/hooks/useWatchedList';
import { Movie, Credits, CastMember, CrewMember } from '@/types';

type MovieClientPageProps = {
    movie: Movie;
    credits: Credits;
    mpaaRating: string | null;
}

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; isActive?: boolean; onClick?: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <button 
            onClick={onClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700/50 hover:bg-zinc-600/80'}`}
        >
            {icon}
        </button>
        <span className="text-xs text-zinc-400">{label}</span>
    </div>
);

export default function MovieClientPage({ movie, credits, mpaaRating }: MovieClientPageProps) {
    const { isMovieInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const { isMovieInWatchedList, addToWatchedList, removeFromWatchedList } = useWatchedList();

    const director = credits.crew.find((member: CrewMember) => member.job === 'Director');
    const mainCast = credits.cast.slice(0, 5);

    return (
        <div className="min-h-screen">
            {/* Backdrop Hero */}
            <div className="relative w-full h-[60vh] -mt-16">
                <div className="absolute inset-0">
                    <ImageWithFallback
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={`${movie.title} backdrop`}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-8 pb-16 -mt-48 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_200px] gap-8">
                    {/* Left Column: Poster */}
                    <div className="w-full h-fit sticky top-20">
                        <ImageWithFallback
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.title} poster`}
                            width={300}
                            height={450}
                            className="rounded-lg shadow-2xl w-full"
                        />
                    </div>

                    {/* Center Column: Details */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-4 text-zinc-400">
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres?.map(genre => (
                                        <span key={genre.id} className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs font-medium rounded-full">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{movie.title}</h1>
                            {movie.tagline && <p className="text-xl text-zinc-400 italic">"{movie.tagline}"</p>}
                        </div>

                        {director && (
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Director</h3>
                                 <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                                        <ImageWithFallback
                                            src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                                            alt={director.name}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                            fallbackType="person"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{director.name}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert prose-zinc max-w-none">
                            <p>{movie.overview}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Starring</h3>
                            <div className="flex flex-wrap gap-4">
                                {mainCast.map((member: CastMember) => (
                                    <div key={member.id} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                                            <ImageWithFallback
                                                src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                                alt={member.name}
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                                fallbackType="person"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{member.name}</p>
                                            <p className="text-sm text-zinc-400">{member.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <MovieDetailTabs movie={movie} credits={credits} mpaaRating={mpaaRating} />
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        <div className="bg-zinc-800/50 p-4 rounded-lg space-y-4">
                            <h3 className="text-lg font-semibold text-white text-center">Actions</h3>
                            <div className="flex justify-around">
                                <ActionButton 
                                    icon={isMovieInWatchedList(movie.id) ? <BsCheckAll size={24} /> : <BsCheck size={24} />} 
                                    label="Watched" 
                                    isActive={isMovieInWatchedList(movie.id)}
                                    onClick={() => isMovieInWatchedList(movie.id) ? removeFromWatchedList(movie.id) : addToWatchedList(movie.id, null)}
                                />
                                <ActionButton icon={<VscHeart size={24} />} label="Like" />
                                <ActionButton 
                                    icon={isMovieInWatchlist(movie.id) ? <BsBookmarkFill size={24} /> : <BsBookmark size={24} />} 
                                    label="Watchlist" 
                                    isActive={isMovieInWatchlist(movie.id)}
                                    onClick={() => isMovieInWatchlist(movie.id) ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
                                />
                            </div>
                        </div>
                        
                        <div className="bg-zinc-800/50 p-4 rounded-lg space-y-2">
                            <h3 className="text-lg font-semibold text-white text-center mb-3">Your Rating</h3>
                            <StarRating size={32} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
} 