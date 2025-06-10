'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { VscCalendar, VscEye, VscHeart, VscStarFull, VscAdd } from 'react-icons/vsc';
import MovieRail from '@/components/MovieRail';
import ReviewCard from '@/components/ReviewCard';
import ActivityFeed from '@/components/ActivityFeed';
import { User, Movie, Review, Activity } from '@/types';

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [activeTab, setActiveTab] = useState<'films' | 'reviews' | 'watchlist' | 'lists'>('films');

  // Mock user data - replace with actual API call
  const user: User = {
    id: '1',
    username: username,
    name: 'Movie Enthusiast',
    bio: 'Film lover, critic, and storyteller. Always looking for the next great cinematic experience.',
    joinedDate: '2022-03-15',
    totalFilms: 1247,
    totalReviews: 89,
    following: 156,
    followers: 324,
  };

  // Mock data - replace with actual API calls
  const favoriteFilms: Movie[] = [
    { id: 1, title: 'The Godfather', poster_path: '/poster1.jpg', overview: '', release_date: '1972-03-24', vote_average: 9.2, vote_count: 15000 },
    { id: 2, title: 'Pulp Fiction', poster_path: '/poster2.jpg', overview: '', release_date: '1994-10-14', vote_average: 8.9, vote_count: 18000 },
    { id: 3, title: 'The Shawshank Redemption', poster_path: '/poster3.jpg', overview: '', release_date: '1994-09-23', vote_average: 9.3, vote_count: 20000 },
    { id: 4, title: 'Schindler\'s List', poster_path: '/poster4.jpg', overview: '', release_date: '1993-12-15', vote_average: 9.0, vote_count: 12000 },
  ];

  const recentlyWatched: Movie[] = [
    { id: 5, title: 'Dune', poster_path: '/poster5.jpg', overview: '', release_date: '2021-10-22', vote_average: 8.0, vote_count: 8000 },
    { id: 6, title: 'Spider-Man: No Way Home', poster_path: '/poster6.jpg', overview: '', release_date: '2021-12-17', vote_average: 8.4, vote_count: 15000 },
    { id: 7, title: 'The Batman', poster_path: '/poster7.jpg', overview: '', release_date: '2022-03-04', vote_average: 7.8, vote_count: 9000 },
  ];

  const userReviews: Review[] = [
    {
      id: '1',
      movieId: 1,
      movieTitle: 'The Godfather',
      posterPath: '/poster1.jpg',
      rating: 10,
      reviewText: 'A masterpiece in every sense. Coppola created something truly timeless with perfect performances from the entire cast.',
      userId: user.id,
      username: user.username,
      createdAt: '2024-01-10T14:30:00Z',
      likes: 45,
      isLiked: false
    },
    {
      id: '2',
      movieId: 2,
      movieTitle: 'Pulp Fiction',
      posterPath: '/poster2.jpg',
      rating: 9,
      reviewText: 'Tarantino at his finest. The non-linear narrative and incredible dialogue make this a rewatchable classic.',
      userId: user.id,
      username: user.username,
      createdAt: '2024-01-08T09:15:00Z',
      likes: 32,
      isLiked: false
    }
  ];

  const activities: Activity[] = [
    {
      id: '1',
      type: 'review',
      userId: user.id,
      username: user.username,
      movieId: 1,
      movieTitle: 'The Godfather',
      posterPath: '/poster1.jpg',
      rating: 10,
      createdAt: '2024-01-10T14:30:00Z',
      text: 'A masterpiece in every sense.'
    },
    {
      id: '2',
      type: 'watch',
      userId: user.id,
      username: user.username,
      movieId: 5,
      movieTitle: 'Dune',
      posterPath: '/poster5.jpg',
      createdAt: '2024-01-09T20:45:00Z',
    },
    {
      id: '3',
      type: 'like',
      userId: user.id,
      username: user.username,
      movieId: 3,
      movieTitle: 'The Shawshank Redemption',
      posterPath: '/poster3.jpg',
      createdAt: '2024-01-07T16:20:00Z',
    }
  ];

  const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-gray-900 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-2 text-[#e5383b]">
        {icon}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-4xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-xl text-gray-300 mb-2">@{user.username}</p>
              {user.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl">{user.bio}</p>
              )}
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <VscCalendar />
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <div className="flex flex-col items-center space-y-2">
              <button className="flex items-center space-x-2 px-6 py-2 bg-[#e5383b] hover:bg-red-600 text-white rounded-lg transition-colors">
                <VscAdd />
                <span>Follow</span>
              </button>
              <div className="flex space-x-4 text-sm text-gray-400">
                <span>{user.following} following</span>
                <span>{user.followers} followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            label="Films Watched"
            value={user.totalFilms}
            icon={<VscEye size={24} />}
          />
          <StatCard
            label="Reviews Written"
            value={user.totalReviews}
            icon={<VscStarFull size={24} />}
          />
          <StatCard
            label="Films Liked"
            value={456}
            icon={<VscHeart size={24} />}
          />
          <StatCard
            label="Lists Created"
            value={12}
            icon={<VscAdd size={24} />}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          {[
            { key: 'films', label: 'Films' },
            { key: 'reviews', label: 'Reviews' },
            { key: 'watchlist', label: 'Watchlist' },
            { key: 'lists', label: 'Lists' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-[#e5383b] border-b-2 border-[#e5383b]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {activeTab === 'films' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-semibold mb-6 text-white">Favorite Films</h2>
                  <MovieRail movies={favoriteFilms} />
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-6 text-white">Recently Watched</h2>
                  <MovieRail movies={recentlyWatched} />
                </section>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Recent Reviews</h2>
                {userReviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <Link href={`/film/${review.movieId}`}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w154${review.posterPath}`}
                          alt={review.movieTitle}
                          width={80}
                          height={120}
                          className="rounded object-cover hover:scale-105 transition-transform"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <Link
                            href={`/film/${review.movieId}`}
                            className="text-xl font-semibold text-white hover:text-[#e5383b]"
                          >
                            {review.movieTitle}
                          </Link>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            {"★".repeat(Math.floor(review.rating / 2))}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">{review.reviewText}</p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                              <VscHeart />
                              <span>{review.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'watchlist' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">Watchlist</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {favoriteFilms.map((movie) => (
                    <Link key={movie.id} href={`/film/${movie.id}`} className="group">
                      <Image
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="w-full rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                      />
                      <h3 className="text-sm font-medium mt-2 text-white group-hover:text-[#e5383b] transition-colors">
                        {movie.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'lists' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">My Lists</h2>
                <div className="space-y-4">
                  {['Sci-Fi Masterpieces', 'Best of 2023', 'Underrated Gems', 'All-Time Favorites'].map((listName, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer">
                      <h3 className="text-lg font-semibold text-white mb-2">{listName}</h3>
                      <p className="text-gray-400 text-sm mb-4">25 films • Updated 2 days ago</p>
                      <div className="flex space-x-2">
                        {favoriteFilms.slice(0, 4).map((movie) => (
                          <Image
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                            alt={movie.title}
                            width={40}
                            height={60}
                            className="rounded object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ActivityFeed activities={activities} title="Recent Activity" />
            
            {/* Network */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Network</h3>
              <div className="space-y-3">
                {['cinephile92', 'moviebuff', 'filmcritic'].map((follower, index) => (
                  <Link
                    key={index}
                    href={`/u/${follower}`}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                      {follower.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm">{follower}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}