let players = [];
let currentPlayer = null;
let score = 0;
let playerName = ''; // Variable to store the player's name
let timerInterval = null; // Variable to store the timer

// Load the score from localStorage
function loadScore() {
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
        score = parseInt(storedScore, 10);
        document.getElementById('score').textContent = `Score: ${score}`;
    }
}

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
    clearInterval(timerInterval); // Clear any existing timer interval
    const randomIndex = Math.floor(Math.random() * players.length);
    currentPlayer = players[randomIndex];
    document.getElementById('player-photo').src = currentPlayer.image;
    document.getElementById('player-name').textContent = "Who's this cricketer?";
    document.getElementById('feedback').textContent = '';
    document.getElementById('guess-input').value = ''; // Clear input for new guess
    startTimer(); // Start the timer for 20 seconds
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
        localStorage.setItem('score', score); // Save the score to localStorage
        showPopup();
        stopTimer(); // Stop the timer when the guess is correct
    } else {
        document.getElementById('feedback').textContent = 'Try again!';
    }
}

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    showRandomPlayer();
}

function startTimer() {
    let timeLeft = 20;
    const timerCircle = document.getElementById('timer-circle');
    const timerText = document.getElementById('timer');

    // Initial update
    updateTimer(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerText.textContent = 'Time\'s up!';
            timerCircle.style.borderColor = '#ff0000'; // Change color when time is up
            showRandomPlayer(); // Automatically move to the next player
        }
    }, 1000);

    function updateTimer(time) {
        timerText.textContent = `Time left: ${time}s`;

        const progress = (time / 20) * 100; // Calculate percentage
        const borderColor = time > 10 ? '#007bff' : '#ff0000'; // Change color based on time
        timerCircle.style.borderColor = borderColor;

        timerCircle.style.background = `conic-gradient(${borderColor} ${progress}%, rgba(255, 255, 255, 0.8) ${progress}%)`;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Function to start the game
function startGame() {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    showRandomPlayer();
}

// Event listener for the "Enter" key in the guess input field
document.getElementById('guess-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkGuess(); // Call the function to check the guess
    }
});

// Event listeners for buttons
document.getElementById('submit-guess-btn').addEventListener('click', checkGuess);
document.getElementById('new-player-btn').addEventListener('click', showRandomPlayer);
document.getElementById('next-player-btn').addEventListener('click', closePopup);
document.getElementById('start-game-btn').addEventListener('click', startGame);

// Load players and initial score
fetchPlayers();
loadScore();
