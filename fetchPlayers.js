// Import required modules using ESM syntax
import fetch from 'node-fetch';
import fs from 'fs';

const apiToken = 'f4xQQ2tgL4THBJrOJVCMZUuMNhMHtmMkoG9hMkdPNbpGwkDJAg2Z5PxeCVjx';
const apiUrl = `https://cricket.sportmonks.com/api/v2.0/players?api_token=${apiToken}`;

// Function to fetch player data from the API
async function fetchPlayers() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract player name and image link
        const players = data.data.map(player => {
            return {
                name: player.fullname,
                image: player.image_path,
            };
        });

        // Save the data to a local file
        saveToFile(players);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to save data to a file
function saveToFile(players) {
    fs.writeFile('players.json', JSON.stringify(players, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Player data successfully saved to players.json');
        }
    });
}

// Run the function
fetchPlayers();
