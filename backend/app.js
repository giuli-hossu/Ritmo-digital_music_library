const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017/music_library";

app.use(express.json());
app.use(cors());
// Connect to MongoDB and define collection
const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected successfully to database');
    return client.db('music_library').collection('DB-music');
  } catch (err) {
    console.error('Failed to connect to the database. Error:', err);
    process.exit(1); // Exit with failure
  }
};

// Define route to get all artists
app.get('/api/artists', async (req, res) => {
  const collection = await connectToDatabase();
  const artists = await collection.find({}).toArray();
  res.json(artists);
});

// Server
app.listen(PORT, () => {
  console.log(`Server runs on ${PORT}`);
});
