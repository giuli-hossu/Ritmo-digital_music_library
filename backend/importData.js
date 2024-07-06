const { MongoClient } = require('mongodb');
const data = require('../data/data.json');

const uri = "mongodb://localhost:27017";
const dbName = "music_library";

const importData = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to server');

    // Check if the database exists
    const adminDb = client.db().admin();
    const databasesList = await adminDb.listDatabases();

    const dbExists = databasesList.databases.some(db => db.name.toLowerCase() === dbName.toLowerCase());

    if (dbExists) {
      console.log(`Database "${dbName}" already exists. Skipping data import.`);
    } else {
      // Proceed with data import
      const db = client.db(dbName);
      const artistsCollection = db.collection('DB-music');

      await artistsCollection.deleteMany({});
      await artistsCollection.insertMany(data);

      console.log('Data Imported');
    }
  } catch (error) {
    console.error('Error with data import', error);
  } finally {
    await client.close();
    process.exit();
  }
};

importData();
