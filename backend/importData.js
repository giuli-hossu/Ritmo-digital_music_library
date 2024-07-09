const { MongoClient } = require('mongodb');
// Import the data from the JSON file
const data = require('../data/data.json');

const uri = "mongodb://localhost:27017";
const dbName = "music_library";

// Function to import data into the MongoDB database
const importData = async () => {
  // Create a new MongoClient instance
  const client = new MongoClient(uri); 

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to server');

    // Check if the database exists
    const adminDb = client.db().admin();
    const databasesList = await adminDb.listDatabases();

    // Check if the target database exists
    const dbExists = databasesList.databases.some(db => db.name.toLowerCase() === dbName.toLowerCase());

    if (dbExists) {
      console.log(`Database "${dbName}" already exists. Skipping data import.`);
    } else {
      // Proceed with data import if the database does not exist
      const db = client.db(dbName);
      const artistsCollection = db.collection('DB-music');
      await artistsCollection.deleteMany({});
      await artistsCollection.insertMany(data);

      console.log('Data Imported');
    }
  } catch (error) {
    // Handle any errors during the process
    console.error('Error with data import', error);
  } finally {
    await client.close();
    process.exit();
  }
};

importData();
