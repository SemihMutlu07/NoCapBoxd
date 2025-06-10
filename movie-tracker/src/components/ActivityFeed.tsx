import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VscHeart, VscEye, VscStarFull } from 'react-icons/vsc';
import { Activity } from '@/types';

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, title = "Recent Activity" }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'review':
        return <VscStarFull className="text-yellow-500" size={16} />;
      case 'watch':
        return <VscEye className="text-blue-500" size={16} />;
      case 'like':
        return <VscHeart className="text-red-500" size={16} />;
      case 'follow':
        return <VscHeart className="text-green-500" size={16} />;
      default:
        return <VscStarFull className="text-gray-500" size={16} />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'review':
        return (
          <>
            <Link href={`/u/${activity.username}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.username}
            </Link>
            <span className="text-gray-400"> reviewed </span>
            <Link href={`/film/${activity.movieId}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.movieTitle}
            </Link>
            {activity.rating && (
              <span className="text-yellow-500 ml-2">
                {"★".repeat(Math.floor(activity.rating / 2))}
              </span>
            )}
          </>
        );
      case 'watch':
        return (
          <>
            <Link href={`/u/${activity.username}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.username}
            </Link>
            <span className="text-gray-400"> watched </span>
            <Link href={`/film/${activity.movieId}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.movieTitle}
            </Link>
          </>
        );
      case 'like':
        return (
          <>
            <Link href={`/u/${activity.username}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.username}
            </Link>
            <span className="text-gray-400"> liked </span>
            <Link href={`/film/${activity.movieId}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.movieTitle}
            </Link>
          </>
        );
      case 'follow':
        return (
          <>
            <Link href={`/u/${activity.username}`} className="font-medium text-white hover:text-[#e5383b]">
              {activity.username}
            </Link>
            <span className="text-gray-400"> started following someone</span>
          </>
        );
      default:
        return null;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      
      {activities.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  {getActivityText(activity)}
                </div>
                
                {activity.text && (
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    "{activity.text}"
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {formatTime(activity.createdAt)}
                  </span>
                </div>
              </div>
              
              {activity.posterPath && (
                <div className="flex-shrink-0">
                  <Link href={`/film/${activity.movieId}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${activity.posterPath}`}
                      alt={activity.movieTitle || ''}
                      width={32}
                      height={48}
                      className="rounded object-cover hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed; 