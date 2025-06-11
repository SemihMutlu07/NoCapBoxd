import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

interface FriendReviewCardProps {
  review: {
    id: string;
    username: string;
    avatarUrl: string;
    movie: {
      id: number;
      title: string;
      posterPath: string;
    };
    rating: number;
    text: string;
  };
  animationDelay?: string;
}

const FriendReviewCard: React.FC<FriendReviewCardProps> = ({ review, animationDelay }) => {
  return (
    <div
      className="bg-gray-900/50 rounded-xl p-4 flex flex-col gap-4 animate-fade-in-up transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
            <ImageWithFallback
                src={review.avatarUrl}
                alt={review.username}
                width={40}
                height={40}
                className="object-cover"
                fallbackType="person"
            />
        </div>
        <div>
          <p className="text-white font-semibold">{review.username}</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-400">reviewed</span>
            <Link href={`/film/${review.movie.id}`} className="text-[#e5383b] font-bold hover:underline truncate">
              {review.movie.title}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href={`/film/${review.movie.id}`} className="flex-shrink-0 w-20 h-[120px] relative">
          <ImageWithFallback
            src={`https://image.tmdb.org/t/p/w154${review.movie.posterPath}`}
            alt={`${review.movie.title} poster`}
            fill
            className="rounded-lg object-cover shadow-lg"
            sizes="80px"
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5 mb-2 text-yellow-400 text-lg">
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)}
          </div>
          <p className="text-gray-300 text-sm line-clamp-3">{review.text}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendReviewCard; 