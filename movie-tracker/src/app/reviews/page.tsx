'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VscHeart, VscComment, VscStarFull, VscFilter, VscSearch } from 'react-icons/vsc';
import { Review } from '@/types';

export default function ReviewsPage() {
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating'>('newest');
  const [filterRating, setFilterRating] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock reviews data - replace with actual API call
  const allReviews: Review[] = [
    {
      id: '1',
      movieId: 1,
      movieTitle: 'The Godfather',
      posterPath: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      rating: 10,
      reviewText: 'Coppola\'s masterpiece remains unmatched in its portrayal of power, family, and corruption. Every frame is meticulously crafted, every performance is perfect. The Godfather isn\'t just a film - it\'s a cinematic experience that transcends entertainment to become art.',
      userId: '1',
      username: 'cinephile92',
      createdAt: '2024-01-15T14:30:00Z',
      likes: 127,
      isLiked: false
    },
    {
      id: '2',
      movieId: 2,
      movieTitle: 'Pulp Fiction',
      posterPath: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      rating: 9,
      reviewText: 'Tarantino\'s non-linear masterpiece changed cinema forever. The dialogue crackles with wit and menace, while the performances from Travolta, Jackson, and Thurman are nothing short of iconic. A film that gets better with every viewing.',
      userId: '2',
      username: 'moviebuff',
      createdAt: '2024-01-14T18:45:00Z',
      likes: 89,
      isLiked: true
    },
    {
      id: '3',
      movieId: 3,
      movieTitle: 'The Matrix',
      posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      rating: 8,
      reviewText: 'Revolutionary in every sense. The Wachowskis created a philosophical action thriller that asks profound questions about reality while delivering spectacular action sequences. Keanu Reeves gives one of his most iconic performances.',
      userId: '3',
      username: 'filmcritic',
      createdAt: '2024-01-14T12:20:00Z',
      likes: 156,
      isLiked: false
    },
    {
      id: '4',
      movieId: 4,
      movieTitle: 'Inception',
      posterPath: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      rating: 9,
      reviewText: 'Nolan\'s mind-bending heist film operates on multiple levels of reality and storytelling. The practical effects are stunning, the performances are committed, and the concept is endlessly fascinating. A modern sci-fi classic.',
      userId: '4',
      username: 'screenjunkie',
      createdAt: '2024-01-13T20:15:00Z',
      likes: 203,
      isLiked: true
    },
    {
      id: '5',
      movieId: 5,
      movieTitle: 'Goodfellas',
      posterPath: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      rating: 10,
      reviewText: 'Scorsese\'s kinetic energy propels this mob epic forward with relentless pace. Ray Liotta, Robert De Niro, and Joe Pesci create a perfect triangle of criminal charisma. The voice-over narration draws you into Henry\'s world completely.',
      userId: '5',
      username: 'classiccinema',
      createdAt: '2024-01-13T15:30:00Z',
      likes: 94,
      isLiked: false
    },
    {
      id: '6',
      movieId: 6,
      movieTitle: 'Parasite',
      posterPath: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      rating: 10,
      reviewText: 'Bong Joon-ho crafted a perfect allegory about class struggle that works on every level - thriller, black comedy, social commentary. The filmmaking is impeccable, and the story unfolds with surgical precision.',
      userId: '6',
      username: 'worldcinema',
      createdAt: '2024-01-12T19:45:00Z',
      likes: 178,
      isLiked: true
    }
  ];

  const filteredAndSortedReviews = allReviews
    .filter(review => {
      const matchesSearch = review.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           review.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           review.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating === 'all' || Math.floor(review.rating / 2) === parseInt(filterRating);
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleLikeReview = (reviewId: string) => {
    // Here you would make an API call to like/unlike the review
    console.log('Toggling like for review:', reviewId);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Film Reviews</h1>
          <p className="text-gray-400">
            {allReviews.length} reviews • {filteredAndSortedReviews.length} showing
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <VscSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews, films, or users..."
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-[#e5383b] focus:outline-none"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <VscFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-[#e5383b] focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Rating Filter */}
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value as any)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-[#e5383b] focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">★★★★★ (5 stars)</option>
              <option value="4">★★★★☆ (4 stars)</option>
              <option value="3">★★★☆☆ (3 stars)</option>
              <option value="2">★★☆☆☆ (2 stars)</option>
              <option value="1">★☆☆☆☆ (1 star)</option>
            </select>
          </div>
        </div>

        {/* Reviews */}
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-white mb-2">No reviews found</h2>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedReviews.map((review) => (
              <article key={review.id} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <div className="flex space-x-4">
                  {/* Movie Poster */}
                  <Link href={`/film/${review.movieId}`} className="flex-shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w154${review.posterPath}`}
                      alt={review.movieTitle}
                      width={80}
                      height={120}
                      className="rounded object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link
                          href={`/film/${review.movieId}`}
                          className="text-xl font-semibold text-white hover:text-[#e5383b] transition-colors"
                        >
                          {review.movieTitle}
                        </Link>
                        <div className="flex items-center space-x-3 mt-1">
                          <Link
                            href={`/u/${review.username}`}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            @{review.username}
                          </Link>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500 text-sm">
                            {formatTime(review.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <VscStarFull
                            key={i}
                            className={
                              i < Math.floor(review.rating / 2)
                                ? 'text-yellow-500'
                                : 'text-gray-600'
                            }
                            size={18}
                          />
                        ))}
                        <span className="text-white ml-2 font-medium">
                          {review.rating}/10
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {review.reviewText}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center space-x-6 text-sm">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          review.isLiked
                            ? 'text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <VscHeart className={review.isLiked ? 'fill-current' : ''} />
                        <span>{review.likes}</span>
                      </button>

                      <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <VscComment />
                        <span>Reply</span>
                      </button>

                      <Link
                        href={`/film/${review.movieId}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        View Film
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredAndSortedReviews.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 