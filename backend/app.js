const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
app.use(express.json());

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/music_library";

MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.error('Failed to connect to the database. Error:', err);
  } else {
    console.log('Connected successfully to database');
  }
});

const Artist = require('./models/DB-music');

// Route to get all artists from the database
app.get('/api/artists', async (req, res) => {
  try {
    const artists = await Artist.find({}); // Get all artists as an array
    res.json(artists); // Return the response as JSON
  } catch (err) {
    console.error('Error fetching artists:', err);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle the error and return an error message
  }
});

  // Server
app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`);
  });


