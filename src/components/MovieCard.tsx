import React from "react";
import { Movie } from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
  onRate: (newRating: number) => void;
}

export const MovieCard = ({ movie, onRate }: MovieCardProps) => {
  return (
    <div className="movie-card p-6 bg-white rounded-xl shadow-lg hover:shadow-xl">
      <div className="mb-4 relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // assuming your movie object has an imagePath field
          alt={movie.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <span className="absolute top-2 right-2 bg-foreground text-white px-3 py-1 rounded-full text-sm">
          #{movie.id.toString().padStart(3, '0')}
        </span>
  
        <h2 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h2>
      </div>
  
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{movie.description}</p>
  
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(star)}
                className={`rating-star ${star <= movie.rating ? 'text-foreground' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-500">
            {movie.rating}/5
          </span>
        </div>
      </div>
    </div>
  )
};