'use client';

import FriendReviewCard from './FriendReviewCard';

const mockReviews = [
  {
    id: '1',
    username: 'cinephile92',
    avatarUrl: 'https://i.pravatar.cc/40?u=cinephile92',
    movie: { id: 1, title: 'The Matrix', posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
    rating: 5,
    text: 'A groundbreaking sci-fi masterpiece that redefined cinema. The action sequences and philosophical questions still hold up today.'
  },
  {
    id: '2',
    username: 'moviebuff',
    avatarUrl: 'https://i.pravatar.cc/40?u=moviebuff',
    movie: { id: 2, title: 'Inception', posterPath: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg' },
    rating: 4,
    text: "Christopher Nolan's magnum opus. A complex, thrilling, and emotionally resonant film that demands multiple viewings."
  },
  {
    id: '3',
    username: 'filmcritic',
    avatarUrl: 'https://i.pravatar.cc/40?u=filmcritic',
    movie: { id: 3, title: 'Pulp Fiction', posterPath: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
    rating: 5,
    text: "Tarantino's iconic style is on full display here. The non-linear narrative and whip-smart dialogue are simply brilliant."
  },
  {
    id: '4',
    username: 'screenjunkie',
    avatarUrl: 'https://i.pravatar.cc/40?u=screenjunkie',
    movie: { id: 4, title: 'The Shawshank Redemption', posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
    rating: 5,
    text: 'An emotionally powerful story of hope and friendship. It truly is a perfect film in every way imaginable.'
  }
];

const FriendReviewsGrid = () => {
  return (
    <section className="mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white text-shadow mb-6">
        Popular Reviews From Friends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReviews.map((review, index) => (
          <FriendReviewCard key={review.id} review={review} animationDelay={`${index * 100}ms`} />
        ))}
      </div>
    </section>
  );
};

export default FriendReviewsGrid; 