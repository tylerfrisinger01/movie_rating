export interface Movie {
  id: number;
  title: string;
  rating: number;
  description: string;
}

export class MovieService {

  static async getMovies(): Promise<Movie[]> {
    const response = await fetch('http://localhost:4000/api/movies');
    return await response.json();
  }


  static async rateMovie(movieId: number, newRating: number): Promise<Movie> {
    const response = await fetch('http://localhost:4000/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, rating: newRating }),
    });
    return await response.json();
    }
}