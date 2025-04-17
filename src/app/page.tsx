'use client';
import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Movie, MovieService } from '../models/Movie';
import { fetchTMDBMovies, TMDBMovie } from '../services/api';
import React from 'react';

export default function Home() {
  const [moviesState, setMoviesState] = useState<Movie[]>([]);
  const [tmdbMovies, setTmdbMovies] = useState<TMDBMovie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies from both sources
        const [dbMovies, tmdbResults] = await Promise.all([
          MovieService.getMovies(),
          fetchTMDBMovies()
        ]);

        // Filter out TMDB movies that exist in database
        const uniqueTmdbMovies = tmdbResults.filter(tmdbMovie => 
          !dbMovies.some(dbMovie => dbMovie.id === tmdbMovie.id)
        );

        // Transform TMDB movies to match your Movie interface
        const transformedMovies = uniqueTmdbMovies
        .filter(tmdbMovie => 
          tmdbMovie.id && 
          tmdbMovie.title?.trim() && 
          tmdbMovie.overview?.trim() &&
          tmdbMovie.poster_path
        )
        .map(tmdbMovie => ({
          id: Number(tmdbMovie.id),
          title: tmdbMovie.title,
          rating: 0,
          description: tmdbMovie.overview,
          poster_path: tmdbMovie.poster_path
        }));

        // console.log('Merged movies:', [...dbMovies, ...transformedMovies]);

        setMoviesState([...dbMovies, ...transformedMovies]);
        setTmdbMovies(tmdbResults);
      } catch (error) {
        console.error('Error:', error);
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleRate = async (movieId: number, newRating: number) => {

    setMoviesState(prev => 
      prev.map(movie => {
        if (movie?.id === movieId) {
          return {
            ...movie,
            rating: newRating,
            title: movie.title || 'Unknown Title', // Fallback
            description: movie.description || 'No description', // Fallback
            poster_path: movie.poster_path || "No movie poster" // Fallback
          };
        }
        return movie;
      })
    );
  
    try {
      const movieToUpdate = moviesState.find(m => m?.id === movieId);
      if (!movieToUpdate) return;
  
      await MovieService.rateMovie({
        id: movieToUpdate.id,
        title: movieToUpdate.title,
        description: movieToUpdate.description,
        rating: newRating,
        poster_path: movieToUpdate.poster_path
      });
      // console.log(movieToUpdate.poster_path);
    } catch (error) {
      console.error("Rating failed:", error);
    }
  };

  const filteredMovies = moviesState.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMovies
            .filter(movie => 
              movie?.id && 
              typeof movie.title === 'string' && 
              typeof movie.description === 'string'
            )
            .map(movie => (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                rating: movie.rating,
                description: movie.description,
                poster_path: movie.poster_path
              }}
              onRate={(newRating) => handleRate(movie.id, newRating)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}