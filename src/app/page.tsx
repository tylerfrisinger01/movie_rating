'use client';
import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Movie, MovieService } from '../models/Movie';

export default function Home() {
  const [moviesState, setMoviesState] = useState<Movie[]>([]);
  
  useEffect(() => {
    MovieService.getMovies().then(setMoviesState);
  }, []);

  const handleRate = async (movieId: number, newRating: number) => {
    await MovieService.rateMovie(movieId, newRating);
    setMoviesState(prev => 
      prev.map(movie => movie.id === movieId ? { ...movie, rating: newRating } : movie)
    );
  };

  return (
    <div className="min-h-screen p-8 bg-pattern">
      <header className="mb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-amber-800 bg-clip-text text-transparent">
            Movie Rating
          </h1>
          <p className="text-lg text-gray-600">
            Discover and rate the greatest films of all time
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {moviesState.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRate={(newRating) => handleRate(movie.id, newRating)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}