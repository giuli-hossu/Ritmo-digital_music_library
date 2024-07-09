// Define the port to run the server on, using an environment variable if available, otherwise defaulting to 5000
const PORT = process.env.PORT || 5000;

// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb://localhost:27017/music_library";

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Function to connect to the MongoDB database and return the collection
const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect(); // Attempt to connect to the database
    console.log('Connected successfully to database');
    return client.db('music_library').collection('DB-music'); // Return the collection
  } catch (err) {
    console.error('Failed to connect to the database. Error:', err);
    process.exit(1); // Exit the process with failure if the connection fails
  }
};

// Define a route to get all artists
app.get('/api/artists', async (req, res) => {
  const collection = await connectToDatabase(); // Connect to the database
  const artists = await collection.find({}).toArray(); // Retrieve all artists from the collection
  res.json(artists); // Send the artists as a JSON response
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server runs on ${PORT}`);
});
