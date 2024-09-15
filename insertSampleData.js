import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://jaisonkumar0205:<db_password>@cluster0.eq2hq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function insertSampleData() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("cricket_game");
    const collection = db.collection("leaderboard");

    // Insert a sample document
    const result = await collection.insertOne({
      name: "Test Player",
      score: 100
    });

    console.log("Inserted sample data:", result.insertedId);
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await client.close();
  }
}

insertSampleData();
