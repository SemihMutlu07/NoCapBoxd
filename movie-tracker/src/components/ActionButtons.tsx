'use client';

import { useWatchlist } from '@/hooks/useWatchlist';
import { useWatchedList } from '@/hooks/useWatchedList';
import { BsBookmark, BsBookmarkFill, BsCheck, BsCheckAll } from 'react-icons/bs';
import { VscHeart } from 'react-icons/vsc';

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; isActive?: boolean; onClick?: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <button 
            onClick={onClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700/50 hover:bg-zinc-600/80'}`}
        >
            {icon}
        </button>
        <span className="text-xs text-zinc-400">{label}</span>
    </div>
);

export const ActionButtons: React.FC<{ movieId: number }> = ({ movieId }) => {
    const { isMovieInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const { isMovieInWatchedList, addToWatchedList, removeFromWatchedList } = useWatchedList();

    return (
        <div className="flex justify-around">
            <ActionButton 
                icon={isMovieInWatchedList(movieId) ? <BsCheckAll size={24} /> : <BsCheck size={24} />} 
                label="Watched" 
                isActive={isMovieInWatchedList(movieId)}
                onClick={() => isMovieInWatchedList(movieId) ? removeFromWatchedList(movieId) : addToWatchedList(movieId, null)}
            />
            <ActionButton icon={<VscHeart size={24} />} label="Like" />
            <ActionButton 
                icon={isMovieInWatchlist(movieId) ? <BsBookmarkFill size={24} /> : <BsBookmark size={24} />} 
                label="Watchlist" 
                isActive={isMovieInWatchlist(movieId)}
                onClick={() => isMovieInWatchlist(movieId) ? removeFromWatchlist(movieId) : addToWatchlist(movieId)}
            />
        </div>
    );
}; 