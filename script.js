let time = 60;
let timerInterval;
let currentWord = '';
let guesses = 0;
const maxGuesses = 4;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('guess-button').addEventListener('click', makeGuess);
document.getElementById('word-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close');

// Show the popup when the page loads
window.onload = function() {
    popup.style.display = 'block';
};

// Close the popup when the user clicks on <span> (x)
closeBtn.onclick = function() {
    popup.style.display = 'none';
};

function startGame() {
    time = 60;
    guesses = 0;
    document.getElementById('time').textContent = time;
    document.getElementById('message').textContent = '';
    document.getElementById('word-input').value = '';
    document.getElementById('word-input').disabled = false;
    document.getElementById('guess-container').innerHTML = '';
    currentWord = words[Math.floor(Math.random() * words.length)];
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    console.log(currentWord); // Remove this line in production
}

function updateTimer() {
    time--;
    document.getElementById('time').textContent = time;
    if (time === 0) {
        endGame(false);
    }
}

function makeGuess() {
    const guess = document.getElementById('word-input').value.trim().toLowerCase();
    if (guess.length !== 5) {
        alert('Please enter a 5-letter word.');
        return;
    }
    guesses++;
    updateGuessContainer(guess);
    if (guess === currentWord) {
        endGame(true);
    } else if (guesses >= maxGuesses) {
        endGame(false);
    } else {
        document.getElementById('word-input').value = '';
    }
}

function updateGuessContainer(guess) {
    const guessContainer = document.getElementById('guess-container');
    guessContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const guessBox = document.createElement('div');
        guessBox.classList.add('guess-box');
        if (guess[i] === currentWord[i]) {
            guessBox.classList.add('correct');
        } else if (currentWord.includes(guess[i])) {
            guessBox.classList.add('present');
        }
        guessBox.textContent = guess[i];
        guessContainer.appendChild(guessBox);
    }
}

function endGame(win) {
    clearInterval(timerInterval);
    document.getElementById('word-input').disabled = true;
    if (win) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
    } else {
        document.getElementById('message').textContent = `Time's up! The word was: ${currentWord}`;
    }
}
