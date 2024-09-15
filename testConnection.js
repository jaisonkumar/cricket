import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://jaisonkumar0205:rupam99999@cluster0.eq2hq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("cricket_game");
    const collection = db.collection("leaderboard");

    // Check if the collection exists and has documents
    const count = await collection.countDocuments();
    console.log("Number of documents in leaderboard collection:", count);

    if (count === 0) {
      console.log("No documents found. Inserting sample data...");
      const result = await collection.insertOne({
        name: "Sample Player",
        score: 0
      });
      console.log("Sample data inserted:", result.insertedId);
    }

  } catch (error) {
    console.error("Error testing connection:", error);
  } finally {
    await client.close();
  }
}

testConnection();
