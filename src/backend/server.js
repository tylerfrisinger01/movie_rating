const express = require('express');
const { submitRating, fetchRatings, fetchMovies } = require('../models/MongoClient');
const mongoose = require('mongoose');
const uri = "mongodb+srv://tfrisinger2:Friguy66@cluster0.9xgrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.post('/api/rate', async (req, res) => {
  
  try {
    const movieData = req.body;
    // console.log("movieData", movieData);
    const result = await submitRating(movieData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/movies', async (req, res) => {
  try {
    const movies = await fetchMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});


app.listen(4000, () => {
  console.log("Server running on port 4000");
});
