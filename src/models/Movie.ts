export interface Movie {
  id: number;
  title: string;
  rating: number;
  description: string;
  poster_path: string;
}

export class MovieService {

  static async getMovies(): Promise<Movie[]> {
    const response = await fetch('http://localhost:4000/api/movies');
    const data = await response.json();
    // console.log('API Response:', data);
    return data;
  }


  static async rateMovie(movie: Movie): Promise<Movie> {
    const response = await fetch('http://localhost:4000/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    return await response.json();
    }
}