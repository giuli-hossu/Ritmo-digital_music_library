const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/music_library";

const listAllDocuments = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const database = client.db('music_library');
    const collections = await database.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`Documents in collection "${collectionName}":`);

      const collection = database.collection(collectionName);
      const documents = await collection.find({}).toArray();

      if (documents.length > 0) {
        documents.forEach(document => {
          console.log(document);
        });
      } else {
        console.log('No documents found in this collection.');
      }

      console.log(); // Separare între colecții pentru claritate
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
};

listAllDocuments();
