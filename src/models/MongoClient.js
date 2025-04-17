import { MongoClient } from "mongodb";

// API_KEY = "5d3be2ba2ea34877184b98ab0af1f3c8"

// API_READ_ACESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDNiZTJiYTJlYTM0ODc3MTg0Yjk4YWIwYWYxZjNjOCIsIm5iZiI6MTc0MDY3NzM2MS44MTYsInN1YiI6IjY3YzBhMGYxYjZjN2UzNDI1Y2EyNTYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c3bW8GtJ2G78EKJQwLdBt2I1xnArI7uYlN5ENhJtD6k"

// Replace the uri string with your connection string.
const uri = "mongodb+srv://tfrisinger2:Friguy66@cluster0.9xgrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);


async function connectDB() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      
    }
    return client.db("movieRatingsDB").collection("collection");
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
}


export async function submitRating(movieData) {
  const collection = await connectDB();
  try {

    const movie_id = Number(movieData.id);

    if (isNaN(movie_id)) {
      throw new Error("Invalid movie ID format");
    }
    
    await collection.updateOne(
      { id: movie_id },
      {
      $set: {
        id: movie_id,
        title: String(movieData.title),
        rating: Number(movieData.rating),
        description: String(movieData.description),
        backdrop_path: String(movieData.backdrop_path)
        }
      },
      { upsert: true }
    );
    return { message: "Rating saved!" };
    
  } catch (error) {
    console.error("Error submiting ratings:", error);
    return { error: error.message };
  }
}


export async function fetchMovies() {
  const collection = await connectDB();
  try {
    return await collection.find().toArray();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
