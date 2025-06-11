import { useState, useEffect } from 'react';

const WATCHED_LIST_KEY = 'watchedList';

interface WatchedMovie {
  movieId: number;
  rating: number | null;
  watchedDate: string;
}

export const useWatchedList = () => {
  const [watchedList, setWatchedList] = useState<WatchedMovie[]>([]);

  useEffect(() => {
    const storedWatchedList = localStorage.getItem(WATCHED_LIST_KEY);
    if (storedWatchedList) {
      setWatchedList(JSON.parse(storedWatchedList));
    }
  }, []);

  const saveWatchedList = (newWatchedList: WatchedMovie[]) => {
    setWatchedList(newWatchedList);
    localStorage.setItem(WATCHED_LIST_KEY, JSON.stringify(newWatchedList));
  };

  const addToWatchedList = (movieId: number, rating: number | null) => {
    if (!watchedList.some((movie) => movie.movieId === movieId)) {
      const newWatchedList = [
        ...watchedList,
        { movieId, rating, watchedDate: new Date().toISOString() },
      ];
      saveWatchedList(newWatchedList);
    }
  };

  const removeFromWatchedList = (movieId: number) => {
    const newWatchedList = watchedList.filter(
      (movie) => movie.movieId !== movieId
    );
    saveWatchedList(newWatchedList);
  };

  const isMovieInWatchedList = (movieId: number) => {
    return watchedList.some((movie) => movie.movieId === movieId);
  };

  return { watchedList, addToWatchedList, removeFromWatchedList, isMovieInWatchedList };
}; 