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

// Debugging logs
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});


app.put('/api/artists/:artistName', async (req, res) => {
  const artistName = req.params.artistName.trim();
  console.log(`Updating artist: ${artistName}`); // Log the artist name
  try {
    const artist = await Artist.findOneAndUpdate(
      { name: artistName },
      {
        name: req.body.name,
        albums: req.body.albums.map(album => ({
          title: album.albumName,
          description: album.albumDescription,
          songs: album.songs.map(song => ({
            title: song.songName,
            length: song.songDuration
          }))
        }))
      },
      { new: true }
    );
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json({ message: 'Artist updated successfully', artist });
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ error: 'Server error', details: error });
  }
});

app.delete('/api/artists/:artistName', async (req, res) => {
  const artistName = req.params.artistName.trim();
  try {
    const artist = await Artist.findOneAndDelete({ name: artistName });
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ error: 'Server error', details: error });
  }
});


// Pornirea serverului

app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}/`);
});