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

    const db = client.db(dbName);
    const artistsCollection = db.collection('DB-music');

    if (dbExists) {
      console.log(`Database "${dbName}" already exists. Checking for existing data.`);

      // Iterate through each document in the data and update or insert accordingly
      for (const artist of data) {
        const { name, albums } = artist;
        const existingArtist = await artistsCollection.findOne({ name });

        if (existingArtist) {
          // Perform update if artist already exists
          await artistsCollection.updateOne({ _id: existingArtist._id }, { $set: { albums } });
          console.log(`Updated artist "${name}"`);
        } else {
          // Perform insert if artist does not exist
          await artistsCollection.insertOne(artist);
          console.log(`Inserted artist "${name}"`);
        }
      }

      console.log('Data import completed.');
    } else {
      // Proceed with data import if the database does not exist
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
