import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      console.error('TMDB API Key is not configured in environment variables.');
      throw new Error('TMDB API Key is not configured.');
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
    const res = await fetch(url);
    
    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        const tmdbMessage = errorBody ? errorBody.status_message : 'No error body from TMDB.';
        throw new Error(
            `Failed to fetch search results for query: ${query}. ` +
            `Status: ${res.status} ${res.statusText}. ` +
            `TMDB Message: ${tmdbMessage}`
        );
    }
    
    const data = await res.json();
    
    // For "multi" search, TMDB returns results with a `media_type` field.
    // We'll filter for just movies and people for this example.
    const movies = data.results.filter((r: any) => r.media_type === 'movie');
    const people = data.results.filter((r: any) => r.media_type === 'person');

    // We can fetch user from our database here if we had one.
    // For now, we return an empty array for users.
    const users: any[] = [];

    return NextResponse.json({ movies, users });

  } catch (error) {
    console.error('Error in search API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error fetching search results', error: errorMessage }, { status: 500 });
  }
} 