const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  length: String,
});

const albumSchema = new mongoose.Schema({
  title: String,
  description: String,
  songs: [songSchema],
});

const artistSchema = new mongoose.Schema({
  name: String,
  albums: [albumSchema],
});

module.exports = mongoose.model('Artist', artistSchema);
