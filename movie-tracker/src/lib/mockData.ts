export interface User {
  name: string;
  filmsWatched: number;
  filmsThisYear: number;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

export const mockUser: User = {
  name: "Semih Mutlu",
  filmsWatched: 542,
  filmsThisYear: 59,
};

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    posterUrl: "https://picsum.photos/seed/shawshank/300/450",
  },
  {
    id: "2",
    title: "The Godfather",
    posterUrl: "https://picsum.photos/seed/godfather/300/450",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    posterUrl: "https://picsum.photos/seed/pulpfiction/300/450",
  },
  {
    id: "4",
    title: "The Dark Knight",
    posterUrl: "https://picsum.photos/seed/darkknight/300/450",
  },
]; 