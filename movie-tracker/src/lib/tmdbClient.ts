const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// This is the core function SWR will use for all data fetching.
export const fetcher = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}?api_key=${API_KEY}`);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    const errorInfo = await res.json();
    console.error(errorInfo);
    throw error;
  }

  return res.json();
};

// Helper function to get the full image URL.
export const getPosterUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};