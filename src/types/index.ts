export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
}

export interface Review {
  id?: string;
  movieId: number;
  userId: string;
  rating: number;
  comment: string;
  watched: boolean;
  createdAt: string;
}