'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { VscHeart, VscEye, VscAdd, VscStarFull, VscShare } from 'react-icons/vsc';
import useSWR from 'swr';
import { fetcher } from '@/lib/tmdbClient';
import ReviewCard from '@/components/ReviewCard';
import { Movie, Review } from '@/types';

const StarRating: React.FC<{ rating: number; onRate?: (rating: number) => void }> = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate?.(star * 2)}
          onMouseEnter={() => setHoverRating(star * 2)}
          onMouseLeave={() => setHoverRating(0)}
          className="text-2xl transition-colors"
        >
          <VscStarFull
            className={
              (hoverRating || rating) >= star * 2
                ? 'text-yellow-500'
                : 'text-gray-600'
            }
          />
        </button>
      ))}
    </div>
  );
};

export default function FilmPage() {
  const params = useParams();
  const movieId = params.id;
  const [userRating, setUserRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const { data: movie, error, isLoading } = useSWR<Movie>(
    movieId ? `/movie/${movieId}` : null,
    fetcher
  );

  // Mock reviews data - replace with actual API call
  const mockReviews: Review[] = [
    {
      id: '1',
      movieId: Number(movieId),
      movieTitle: movie?.title || '',
      posterPath: movie?.poster_path || '',
      rating: 8,
      reviewText: 'An absolute masterpiece that redefined cinema. The visual effects still hold up decades later, and the philosophical themes are more relevant than ever.',
      userId: '1',
      username: 'cinephile92',
      createdAt: '2024-01-15T10:30:00Z',
      likes: 24,
      isLiked: false
    },
    {
      id: '2',
      movieId: Number(movieId),
      movieTitle: movie?.title || '',
      posterPath: movie?.poster_path || '',
      rating: 9,
      reviewText: 'Mind-bending and visually stunning. A film that gets better with each viewing.',
      userId: '2',
      username: 'moviebuff',
      createdAt: '2024-01-14T15:45:00Z',
      likes: 12,
      isLiked: true
    }
  ];

  const handleRate = (rating: number) => {
    setUserRating(rating);
    // Here you would typically save to API
  };

  const handleSubmitReview = () => {
    if (reviewText.trim()) {
      // Here you would submit the review to API
      console.log('Submitting review:', { rating: userRating, text: reviewText });
      setShowReviewForm(false);
      setReviewText('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Failed to load movie details</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
            : 'linear-gradient(to bottom, #1f2937, #111827)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex items-end space-x-6">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="rounded-lg shadow-2xl"
            />
            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-xl text-gray-300 mb-4">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <VscStarFull className="text-yellow-500" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span>{movie.vote_count.toLocaleString()} ratings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
            </section>

            {/* User Actions */}
            <section className="flex flex-wrap items-center gap-4 p-6 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">Rate:</span>
                <StarRating rating={userRating} onRate={handleRate} />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <VscEye />
                <span>Mark as Watched</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <VscAdd />
                <span>Add to Watchlist</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <VscHeart />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <VscShare />
                <span>Share</span>
              </button>
            </section>

            {/* Write Review */}
            <section className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Write a Review</h3>
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors"
                >
                  Click to write a review...
                </button>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts about this film..."
                    className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#e5383b] focus:outline-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-white">Your rating:</span>
                      <StarRating rating={userRating} onRate={handleRate} />
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        className="px-6 py-2 bg-[#e5383b] hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        Post Review
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Reviews */}
            <section>
              <h3 className="text-xl font-semibold mb-6 text-white">
                Popular Reviews ({mockReviews.length})
              </h3>
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/u/${review.username}`}
                            className="font-medium text-white hover:text-[#e5383b]"
                          >
                            {review.username}
                          </Link>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <div className="flex items-center">
                              {"★".repeat(Math.floor(review.rating / 2))}
                            </div>
                            <span>•</span>
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{review.reviewText}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <VscHeart className={review.isLiked ? 'text-red-500' : ''} />
                        <span>{review.likes}</span>
                      </button>
                      <button className="hover:text-white transition-colors">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Details */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Release Date:</span>
                  <span className="text-white ml-2">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </span>
                </div>
                {movie.runtime && (
                  <div>
                    <span className="text-gray-400">Runtime:</span>
                    <span className="text-white ml-2">{movie.runtime} minutes</span>
                  </div>
                )}
                {movie.genres && (
                  <div>
                    <span className="text-gray-400">Genres:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Films */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Similar Films</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Mock similar films - replace with actual API data */}
                {[1, 2, 3, 4].map((i) => (
                  <Link key={i} href={`/film/${i}`} className="group">
                    <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2 group-hover:scale-105 transition-transform" />
                    <p className="text-xs text-gray-400 group-hover:text-white transition-colors">
                      Similar Film {i}
                    </p>
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