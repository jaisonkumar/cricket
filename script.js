// Array to store the player data
let players = [];
let currentPlayer = null;
let score = 0;  // Initialize the score

// Function to fetch player data and populate the players array
async function fetchPlayers() {
    try {
        const response = await fetch('players.json');
        players = await response.json();

        // Filter out placeholder images
        players = players.filter(player => !player.image.includes('placeholder'));

        // Load the initial default image
        showDefaultImage();
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

// Function to display a random player
function showRandomPlayer() {
    if (players.length === 0) return;

    const randomIndex = Math.floor(Math.random() * players.length);
    currentPlayer = players[randomIndex];

    document.getElementById('player-photo').src = currentPlayer.image;
    document.getElementById('player-name').textContent = "Who's this cricketer?";
    document.getElementById('feedback').textContent = '';
}

// Function to check the user's guess
function checkGuess() {
    const guess = document.getElementById('guess-input').value.trim().toLowerCase();
    if (!currentPlayer) return;

    const fullName = currentPlayer.name.toLowerCase();
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1] || '';  // Handle cases with no last name

    if (guess === fullName || guess === firstName || guess === lastName) {
        document.getElementById('feedback').textContent = 'Correct! Well done!';
        document.getElementById('feedback').style.color = 'green';
        updateScore(1);  // Increase score for a correct guess
        showPopup('You guessed correctly!');  // Show popup on correct guess

        // Clear the input box
        document.getElementById('guess-input').value = '';
    } else {
        document.getElementById('feedback').textContent = 'Sorry, try again!';
        document.getElementById('feedback').style.color = 'red';
    }
}

// Function to show the popup
function showPopup(message) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'flex';
}

// Function to hide the popup
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to update the score and store it locally
function updateScore(amount) {
    score += amount;
    localStorage.setItem('cricketerScore', score);  // Store the score in localStorage
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to load the score from localStorage
function loadScore() {
    const storedScore = localStorage.getItem('cricketerScore');
    if (storedScore) {
        score = parseInt(storedScore, 10);
        document.getElementById('score').textContent = `Score: ${score}`;
    }
}

// Function to handle Enter key press in the input field
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if in a form
        document.getElementById('submit-guess-btn').click(); // Trigger click on the submit button
    }
}

// Function to start the game
function startGame() {
    document.getElementById('start-section').style.display = 'none'; // Hide start section
    document.getElementById('game-section').style.display = 'block'; // Show game section
    showRandomPlayer(); // Show the first player
}

// Function to display the default image
function showDefaultImage() {
    document.getElementById('default-image').style.display = 'block';
    document.getElementById('player-photo').style.display = 'none';
}

// Function to hide the default image and show a player image
function showPlayerImage() {
    document.getElementById('default-image').style.display = 'none';
    document.getElementById('player-photo').style.display = 'block';
}

// Add event listeners
document.getElementById('start-game-btn').addEventListener('click', function() {
    startGame();
    showPlayerImage(); // Ensure player image is shown when the game starts
});
document.getElementById('new-player-btn').addEventListener('click', showRandomPlayer);
document.getElementById('submit-guess-btn').addEventListener('click', checkGuess);
document.getElementById('next-player-btn').addEventListener('click', function() {
    hidePopup();
    showRandomPlayer();
});
document.getElementById('guess-input').addEventListener('keydown', handleEnterKey); // Add Enter key listener

// Fetch player data and load score on page load
fetchPlayers();
loadScore();
