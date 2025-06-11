'use client';

import { mockUser } from '@/lib/mockData';

const WelcomeHeader = () => {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Welcome back, <span className="text-[#e5383b]">{mockUser.name}</span> 🎬
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Let's see what's new in your world of film.
        </p>
      </div>
    </section>
  );
};

export default WelcomeHeader; 