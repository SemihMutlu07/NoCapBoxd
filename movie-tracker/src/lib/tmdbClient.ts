class FetchError extends Error {
  info: any;
  status: number;

  constructor(message: string, info: any, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

export const BASE_URL = 'https://api.themoviedb.org/3';

const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
console.log('Attempting to read API Token:', token);

if (!token) {
  throw new Error('TMDB API Token is not configured');
}

export const TMDB_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
};

// This is the core function SWR will use for all data fetching.
export const fetcher = async (url: string) => {
  const res = await fetch(url, TMDB_OPTIONS);

  if (!res.ok) {
    let info;
    try {
      info = await res.json();
    } catch (e) {
      info = { status_message: res.statusText };
    }
    
    throw new FetchError(
      'An error occurred while fetching the data.',
      info,
      res.status
    );
  }

  return res.json();
};

// Helper function to get the full image URL.
export const getPosterUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};