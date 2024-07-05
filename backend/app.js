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

// Ruta pentru a obține toți artiștii din baza de date
app.get('/api/artists', async (req, res) => {
  try {
    const collection = db.collection('artists'); // Accesăm colecția de artiști din baza de date
    const artists = await collection.find({}).toArray(); // Obținem toți artiștii sub formă de array
    res.json(artists); // Returnăm răspunsul sub formă de JSON
  } catch (err) {
    console.error('Error fetching artists:', err);
    res.status(500).json({ error: 'Internal Server Error' }); // Tratează eroarea și returnează un mesaj de eroare
  }
});
  // Pornirea serverului
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
  });


