let players = [];
let currentPlayer = null;
let score = 0;
let playerName = ''; // Variable to store the player's name
let leaderboard = []; // Array to store leaderboard data

async function fetchPlayers() {
    try {
        const response = await fetch('players.json');
        players = await response.json();
        players = players.filter(player => !player.image.includes('placeholder'));
        showDefaultImage();
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

function showRandomPlayer() {
    if (players.length === 0) return;
    const randomIndex = Math.floor(Math.random() * players.length);
    currentPlayer = players[randomIndex];
    document.getElementById('player-photo').src = currentPlayer.image;
    document.getElementById('player-name').textContent = "Who's this cricketer?";
    document.getElementById('feedback').textContent = '';
}

function checkGuess() {
    const guess = document.getElementById('guess-input').value.trim().toLowerCase();
    if (!currentPlayer) return;
    const fullName = currentPlayer.name.toLowerCase();
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1] || '';
    if (guess === fullName || guess === firstName || guess === lastName) {
        document.getElementById('feedback').textContent = 'Correct!';
        document.getElementById('popup-message').textContent = 'You guessed correctly!';
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        updateLeaderboard();
        showPopup();
    } else {
        document.getElementById('feedback').textContent = 'Try again!';
    }
}

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

async function updateLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: playerName, score: score }),
        });
        if (!response.ok) throw new Error('Failed to update leaderboard');
        await fetchLeaderboard(); // Refresh the leaderboard after updating
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

async function fetchLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        leaderboard = await response.json();
        renderLeaderboard();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

function renderLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard');
    leaderboardList.innerHTML = '';
    leaderboard.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });
}

function showLeaderboard() {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('leaderboard-section').style.display = 'block';
    fetchLeaderboard(); // Fetch the latest leaderboard data
}

function startGame() {
    document.getElementById('name-input-dialog').style.display = 'none';
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    showRandomPlayer();
}

function restartGame() {
    score = 0;
    document.getElementById('score').textContent = 'Score: 0';
    leaderboard = [];
    renderLeaderboard();
    document.getElementById('leaderboard-section').style.display = 'none';
    document.getElementById('start-section').style.display = 'block';
    fetchPlayers();
}

document.getElementById('start-game-btn').addEventListener('click', () => {
    document.getElementById('name-input-dialog').style.display = 'flex';
});

document.getElementById('submit-name-btn').addEventListener('click', () => {
    playerName = document.getElementById('player-name-input').value.trim();
    if (playerName) {
        startGame();
    }
});

document.getElementById('submit-guess-btn').addEventListener('click', checkGuess);
document.getElementById('next-player-btn').addEventListener('click', () => {
    hidePopup();
    showRandomPlayer();
});
document.getElementById('new-player-btn').addEventListener('click', showRandomPlayer);
document.getElementById('show-leaderboard-btn').addEventListener('click', showLeaderboard);
document.getElementById('restart-game-btn').addEventListener('click', restartGame);

// Initialize game
fetchPlayers();
