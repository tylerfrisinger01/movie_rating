// seed.js (temporary)
const { MongoClient } = require('mongodb');
const { movies } = require('./models/moviesData');
const uri = "mongodb+srv://tfrisinger2:Friguy66@cluster0.9xgrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();
  const collection = client.db("movieRatingsDB").collection("collection");
  await collection.insertMany(movies);
  console.log("Database seeded!");
  await client.close();
}

seed();