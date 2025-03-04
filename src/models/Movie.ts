import { movies } from "./moviesData";

export interface Movie {
  id: number;
  title: string;
  rating: number;
  description: string;
}

export class MovieService {
  private static movies: Movie[] = movies;

  static getMovies(): Movie[] {
    return structuredClone(this.movies); // Return copy to prevent direct mutation of the sample movies
  }

  static rateMovie(movieId: number, newRating: number): Promise<Movie> {
    // This is where we could actually hook up the mongoDB database to. I made these promises
    // so that we don't have to deal with this later
    return new Promise((resolve) => {
      setTimeout(() => {
        const movie = this.movies.find(m => m.id === movieId);
        if (movie) {
          movie.rating = newRating;
          resolve(structuredClone(movie));
        } else {
          throw new Error("Movie not found");
        }
      }, 100);
    });
  }
}