import { Movie, Credits, ReleaseDatesResponse } from '@/types';

// Helper function to find the US MPAA rating
const getMpaaRating = (release_dates: ReleaseDatesResponse) => {
  const usRelease = release_dates.results.find(r => r.iso_3166_1 === 'US');
  if (usRelease) {
    // Find the certification, preferring theatrical releases
    const theatrical = usRelease.release_dates.find(rd => rd.type === 3);
    if (theatrical?.certification) return theatrical.certification;
    // Fallback to the first available certification
    for (const rd of usRelease.release_dates) {
      if (rd.certification) return rd.certification;
    }
  }
  return 'Not Rated';
};

export async function getMovieData(movieId: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    
    if (!apiKey) {
      throw new Error('TMDB API Key is not configured.');
    }

    const baseUrl = 'https://api.themoviedb.org/3';
    const [movieRes, creditsRes, releaseDatesRes] = await Promise.all([
      fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`),
      fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`),
      fetch(`${baseUrl}/movie/${movieId}/release_dates?api_key=${apiKey}`),
    ]);

    if (!movieRes.ok) {
        const errorBody = await movieRes.json().catch(() => null); // Read the error body
        const tmdbMessage = errorBody ? errorBody.status_message : 'No error body from TMDB.';

        throw new Error(
            `Failed to fetch movie details for ID: ${movieId}. ` +
            `Status: ${movieRes.status} ${movieRes.statusText}. ` +
            `TMDB Message: ${tmdbMessage}`
        );
    }

    const movie: Movie = await movieRes.json();
    const credits: Credits = await creditsRes.json();
    const releaseDates: ReleaseDatesResponse = await releaseDatesRes.json();
    
    const mpaaRating = getMpaaRating(releaseDates);
    
    return {
      movie,
      credits,
      mpaaRating,
    };

  } catch (error) {
    console.error('Error fetching movie data:', error);
    // In a real app, you'd want to handle this more gracefully
    return null;
  }
} 