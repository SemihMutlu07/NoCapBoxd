'use client';

import useSWR from 'swr';
import MovieRail from '@/components/MovieRail';
import ActivityFeed from '@/components/ActivityFeed';
import { mockUser } from '@/lib/mockData';
import { fetcher } from '@/lib/tmdbClient';
import { Activity } from '@/types';

// A simple loading skeleton for a better user experience
const MovieRailSkeleton = () => (
  <div className="flex space-x-4 pb-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex-shrink-0 w-40">
        <div className="w-full h-60 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-4 bg-gray-800 rounded mt-2 animate-pulse"></div>
      </div>
    ))}
  </div>
);

export default function HomePage() {
  const { data: popularMovies, error, isLoading } = useSWR('/movie/popular', fetcher);
  const { data: nowPlayingMovies } = useSWR('/movie/now_playing', fetcher);
  const { data: upcomingMovies } = useSWR('/movie/upcoming', fetcher);

  // Mock activity data - replace with actual API call
  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'review',
      userId: '2',
      username: 'cinephile92',
      movieId: 1,
      movieTitle: 'The Matrix',
      posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      rating: 9,
      createdAt: '2024-01-15T14:30:00Z',
      text: 'A groundbreaking sci-fi masterpiece that redefined cinema.'
    },
    {
      id: '2',
      type: 'watch',
      userId: '3',
      username: 'moviebuff',
      movieId: 2,
      movieTitle: 'Inception',
      posterPath: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      createdAt: '2024-01-15T12:15:00Z',
    },
    {
      id: '3',
      type: 'like',
      userId: '4',
      username: 'filmcritic',
      movieId: 3,
      movieTitle: 'Pulp Fiction',
      posterPath: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      createdAt: '2024-01-15T10:45:00Z',
    },
    {
      id: '4',
      type: 'review',
      userId: '5',
      username: 'screenjunkie',
      movieId: 4,
      movieTitle: 'The Shawshank Redemption',
      posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      rating: 10,
      createdAt: '2024-01-14T18:20:00Z',
      text: 'An emotionally powerful story of hope and friendship.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, {mockUser.name}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover your next favorite film and connect with fellow movie lovers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Popular Movies */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">Popular This Week</h2>
              {isLoading && <MovieRailSkeleton />}
              {error && <p className="text-[#e5383b]">Failed to load movies.</p>}
              {popularMovies && <MovieRail movies={popularMovies.results} />}
            </section>

            {/* Now Playing */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">Now in Theaters</h2>
              {nowPlayingMovies ? (
                <MovieRail movies={nowPlayingMovies.results} />
              ) : (
                <MovieRailSkeleton />
              )}
            </section>

            {/* Coming Soon */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-white">Coming Soon</h2>
              {upcomingMovies ? (
                <MovieRail movies={upcomingMovies.results} />
              ) : (
                <MovieRailSkeleton />
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ActivityFeed activities={recentActivities} title="Friend Activity" />
            
            {/* Quick Stats */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Films Watched</span>
                  <span className="font-semibold text-white">{mockUser.filmsWatched}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">This Year</span>
                  <span className="font-semibold text-white">{mockUser.filmsThisYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reviews Written</span>
                  <span className="font-semibold text-white">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Watchlist</span>
                  <span className="font-semibold text-white">47</span>
                </div>
              </div>
            </div>

            {/* Popular Genres */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Popular Genres</h3>
              <div className="flex flex-wrap gap-2">
                {['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror'].map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}