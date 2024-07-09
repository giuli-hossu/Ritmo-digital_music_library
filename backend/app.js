const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Artist = require('./models/DB-music'); 

const app = express();
const PORT = process.env.PORT || 5000;
const uri = "mongodb://localhost:27017/music_library";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

app.use(express.json());
app.use(cors());

// GET all artists
app.get('/api/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists); 
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'An error occurred while fetching artists' });
  }
});

// POST new artist
app.post('/api/artists', async (req, res) => {
  try {
    const artistData = req.body;

    const newArtist = new Artist({
      name: artistData.name,
      albums: artistData.albums.map(album => ({
        title: album.albumName,
        description: album.albumDescription,
        songs: album.songs.map(song => ({
          title: song.songName,
          length: song.songDuration
        }))
      }))
    });

    const savedArtist = await newArtist.save();
    res.status(201).json(savedArtist);
    
  } catch (error) {
    console.error('Error saving artist data:', error);
    res.status(500).json({ error: 'An error occurred while saving the artist data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server runs on ${PORT}`);
});
