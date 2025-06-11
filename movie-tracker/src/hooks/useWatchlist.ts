import { useState, useEffect } from 'react';

const WATCHLIST_KEY = 'watchlist';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem(WATCHLIST_KEY);
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  const saveWatchlist = (newWatchlist: number[]) => {
    setWatchlist(newWatchlist);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
  };

  const addToWatchlist = (movieId: number) => {
    if (!watchlist.includes(movieId)) {
      const newWatchlist = [...watchlist, movieId];
      saveWatchlist(newWatchlist);
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    const newWatchlist = watchlist.filter((id) => id !== movieId);
    saveWatchlist(newWatchlist);
  };

  const isMovieInWatchlist = (movieId: number) => {
    return watchlist.includes(movieId);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isMovieInWatchlist };
}; 