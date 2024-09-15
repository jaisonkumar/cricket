import { readFile, writeFile } from 'fs/promises';

// Path to your JSON file
const filePath = './players.json';

// Function to filter out players with placeholder images
async function filterPlayers() {
    try {
        // Read the JSON file
        const data = await readFile(filePath, 'utf8');
        
        // Parse JSON data
        let players = JSON.parse(data);
        
        // Filter out players with placeholder images
        players = players.filter(player => !player.image.includes('placeholder'));

        // Write the filtered data back to the JSON file
        await writeFile(filePath, JSON.stringify(players, null, 2), 'utf8');
        
        console.log('Players have been filtered and saved successfully.');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Run the filter function
filterPlayers();
