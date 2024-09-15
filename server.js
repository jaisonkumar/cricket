import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection URI
const MONGO_URI = 'mongodb+srv://jaisonkumar0205:rupam99999@cluster0.eq2hq.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
let db;
async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('cricket_game');  // Replace with your actual database name
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Endpoint to get leaderboard data
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboardCollection = db.collection('leaderboard');
        const leaderboard = await leaderboardCollection.find({}).sort({ score: -1 }).toArray();
        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).send('Failed to fetch leaderboard');
    }
});

// Endpoint to update leaderboard data
app.post('/api/leaderboard', async (req, res) => {
    try {
        const newEntry = req.body;
        const leaderboardCollection = db.collection('leaderboard');
        await leaderboardCollection.updateOne(
            { name: newEntry.name },
            { $set: { score: newEntry.score } },
            { upsert: true }
        );
        res.status(200).send('Leaderboard updated');
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        res.status(500).send('Failed to update leaderboard');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
connectDB();
