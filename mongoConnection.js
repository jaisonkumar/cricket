import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://jaisonkumar0205:rupam99999@cluster0.eq2hq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("cricket_game"); // Return the specific database
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectDB;
