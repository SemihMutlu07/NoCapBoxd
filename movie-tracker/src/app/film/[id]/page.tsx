import { getMovieData } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { VscHeart } from 'react-icons/vsc';
import { StarRating } from '@/components/StarRating';
import MovieDetailTabs from '@/components/MovieDetailTabs';
import ImageWithFallback from '@/components/ImageWithFallback';
import { ActionButtons } from '@/components/ActionButtons';
import { CastMember } from '@/types';


// The error occurs because Next.js has a specific, complex type for page props
// that includes more than just `params`. Directly defining a simple props type
// like `MovieDetailPageProps` and using it in the function signature `({ params: { id } }: MovieDetailPageProps)`
// creates a type mismatch with Next.js's internal expectations for an async Page component.
//
// The fix is to define a props interface that correctly matches the expected structure
// from Next.js, including `params` and optional `searchParams`. Then, we destructure
// `params` directly from this props object in the function signature. This aligns
// our component's signature with what the Next.js type system expects, resolving the conflict.
interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = params;
  const data = await getMovieData(id);

  if (!data) {
    notFound();
  }
  
  const { movie, credits, mpaaRating } = data;
  const director = credits.crew.find(member => member.job === 'Director');
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
                            {mainCast.map((member : CastMember) => (
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
                        <ActionButtons movieId={movie.id} />
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