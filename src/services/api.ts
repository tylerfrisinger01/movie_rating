export interface TMDBMovie {
  id: number;
  title: string;
  rating?: number;
  overview: string;
  // Add other fields we want from TMDB
}

export async function fetchTMDBMovies(): Promise<TMDBMovie[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDNiZTJiYTJlYTM0ODc3MTg0Yjk4YWIwYWYxZjNjOCIsIm5iZiI6MTc0MDY3NzM2MS44MTYsInN1YiI6IjY3YzBhMGYxYjZjN2UzNDI1Y2EyNTYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c3bW8GtJ2G78EKJQwLdBt2I1xnArI7uYlN5ENhJtD6k'
    }
  };

  const pages = [1, 2, 3, 4];
  const allMovies: TMDBMovie[] = [];

  for (const page of pages) {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/21847943/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    );
    const data = await response.json();
    allMovies.push(...data.results);
  }
  // console.log(allMovies)
  return allMovies;
}