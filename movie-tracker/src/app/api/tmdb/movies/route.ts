import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json({ message: 'API endpoint is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      console.error('TMDB API Key is not configured in environment variables.');
      throw new Error('TMDB API Key is not configured.');
    }

    const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1`;

    const res = await fetch(url);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      const tmdbMessage = errorBody ? errorBody.status_message : 'No error body from TMDB.';
      throw new Error(
        `Failed to fetch movies for endpoint: ${endpoint}. ` +
        `Status: ${res.status} ${res.statusText}. ` +
        `TMDB Message: ${tmdbMessage}`
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error(`Error in movies API route:`, error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An internal server error occurred' },
      { status: 500 }
    );
  }
} 