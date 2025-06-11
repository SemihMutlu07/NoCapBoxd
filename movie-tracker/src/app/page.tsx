'use client';

import MovieRail from '@/components/MovieRail';
import WelcomeHeader from '@/components/WelcomeHeader';
import FriendReviewsGrid from '@/components/FriendReviewsGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <WelcomeHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Popular Movies */}
        <section className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-shadow">
              Popular This Week
            </h2>
            <button className="text-[#e5383b] hover:text-[#f54b4e] text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105">
              View All
            </button>
          </div>
          <MovieRail endpoint="movie/popular" />
        </section>

        {/* Now Playing */}
        <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-shadow">
              Now in Theaters
            </h2>
            <button className="text-[#e5383b] hover:text-[#f54b4e] text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105">
              View All
            </button>
          </div>
          <MovieRail endpoint="movie/now_playing" />
        </section>

        {/* Top Rated */}
        <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-shadow">
              Top Rated of All Time
            </h2>
            <button className="text-[#e5383b] hover:text-[#f54b4e] text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105">
              View All
            </button>
          </div>
          <MovieRail endpoint="movie/top_rated" />
        </section>

        {/* Coming Soon */}
        <section className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-shadow">
              Coming Soon
            </h2>
            <button className="text-[#e5383b] hover:text-[#f54b4e] text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105">
              View All
            </button>
          </div>
          <MovieRail endpoint="movie/upcoming" />
        </section>

        {/* Friend Reviews */}
        <FriendReviewsGrid />
      </div>
    </div>
  );
}