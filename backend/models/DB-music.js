const mongoose = require('mongoose');

// Define the schema for a Song
const songSchema = new mongoose.Schema({
  title: String, // Title of the song
  length: String, // Length of the song
});

// Define the schema for an Album
const albumSchema = new mongoose.Schema({
  title: String, // Title of the album
  description: String, // Description of the album
  songs: [songSchema], // Array of songs in the album, each adhering to the songSchema
});

// Define the schema for an Artist
const artistSchema = new mongoose.Schema({
  name: String, // Name of the artist
  albums: [albumSchema], // Array of albums by the artist, each adhering to the albumSchema
});

// Export the Artist model based on the artistSchema
module.exports = mongoose.model('Artist', artistSchema);
