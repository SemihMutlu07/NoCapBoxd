export interface Movie {
  id: number;
  title: string;
  tagline?: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  genres?: Genre[];
  posterUrl?: string; // For compatibility with existing code
}

export interface Genre {
  id: number;
  name: string;
}

export interface Review {
  id: string;
  movieId: number;
  movieTitle: string;
  posterPath: string;
  rating: number;
  reviewText: string;
  userId: string;
  username: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  joinedDate: string;
  totalFilms: number;
  totalReviews: number;
  following: number;
  followers: number;
}

export interface WatchlistItem {
  movieId: number;
  movieTitle: string;
  posterPath: string;
  addedAt: string;
}

export interface Activity {
  id: string;
  type: 'review' | 'watch' | 'like' | 'follow';
  userId: string;
  username: string;
  movieId?: number;
  movieTitle?: string;
  posterPath?: string;
  rating?: number;
  createdAt: string;
  text?: string;
}

export interface SearchResult {
  movies: Movie[];
  users: User[];
  total: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDatesResponse {
  id: number;
  results: ReleaseDateResult[];
} 
