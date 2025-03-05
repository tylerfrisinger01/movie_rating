import { error } from "console";
import { MongoClient } from "mongodb";

API_KEY = "5d3be2ba2ea34877184b98ab0af1f3c8"

API_READ_ACESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDNiZTJiYTJlYTM0ODc3MTg0Yjk4YWIwYWYxZjNjOCIsIm5iZiI6MTc0MDY3NzM2MS44MTYsInN1YiI6IjY3YzBhMGYxYjZjN2UzNDI1Y2EyNTYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c3bW8GtJ2G78EKJQwLdBt2I1xnArI7uYlN5ENhJtD6k"

// Replace the uri string with your connection string.
const uri = "mongodb+srv://tfrisinger2:Friguy66@cluster0.9xgrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);


export async function fetchRatings(movie_id) {
  try {
    await client.connect();
    const db = client.db("movieRatingsDB");
    const collection = db.collection("collection");

    const ratings = await collection.find({ movie_id: Number(movie_id) }).toArray();
    return ratings;
  } catch (error) {
    console.error("Error fetching ratings", error);
    return [];
  } finally {
    await client.close();
  }
}

export async function submitRating(movie_id, rating, review) {
  try {
    await client.connect();
    const db = client.db("movieRatingsDB");
    const collection = db.collection("collection");

    await collection.insertOne({
      movie_id: Number(movie_id),
      rating,
      review,
      created_at: new Date(),
    });
    return { message: "Rating saved!" };
    
  } catch (error) {
    console.error("Error submiting ratings:", error);
    return {error: error.message};
  } finally {
    await client.close();
  }
}

