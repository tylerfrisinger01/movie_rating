// app/movies/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Movie } from '../../../models/Movie';
import { MovieService } from '../../../models/Movie';
import { fetchTMDBMovies, TMDBMovie } from '../../../services/api';

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const load = async () => {
      const [dbMovies, tmdbResults] = await Promise.all([
        MovieService.getMovies(),
        fetchTMDBMovies(),
      ]);
      const tmdbTransformed: Movie[] = tmdbResults
        .filter(m => m.id && m.overview && m.backdrop_path)
        .map((m: TMDBMovie) => ({
          id: Number(m.id),
          title: m.title,
          description: m.overview,
          rating: 0,
          backdrop_path: m.backdrop_path,
        }));
      const all = [...dbMovies, ...tmdbTransformed];
      setMovie(all.find(m => String(m.id) === id) || null);
    };
    load();
  }, [id]);

  const handleRate = async (newRating: number) => {
    if (!movie) return;
    setMovie({ ...movie, rating: newRating });
    try {
      await MovieService.rateMovie({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        rating: newRating,
        backdrop_path: movie.backdrop_path,
      });
    } catch (err) {
      console.error('Rating failed', err);
    }
  };

  if (!movie) return <p className="p-8">Loading…</p>;

  return (
    <div className="min-h-screen p-8 bg-pattern">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center mb-6 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="mb-8 relative">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg mb-4"
          />
          <span className="absolute top-2 right-2 bg-foreground text-white px-3 py-1 rounded-full text-sm">
            #{String(movie.id).padStart(3, '0')}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-800 leading-relaxed mb-6">
          {movie.description}
        </p>

        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className={`rating-star ${
                star <= movie.rating ? 'text-foreground' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
          <span className="text-gray-500">{movie.rating}/5</span>
        </div>
      </div>
    </div>
  );
}
