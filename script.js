let guesses = 0;
const maxGuesses = 5;
let currentWord = '';

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
    guesses = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('word-input').value = '';
    document.getElementById('word-input').disabled = false;
    document.getElementById('guess-container').innerHTML = '';
    currentWord = words[Math.floor(Math.random() * words.length)];
    console.log(currentWord); // Remove this line in production
    document.getElementById('word-input').setAttribute('maxlength', currentWord.length);
    document.getElementById('word-input').setAttribute('placeholder', `Guess a ${currentWord.length}-letter word...`);
}

function makeGuess() {
    const guess = document.getElementById('word-input').value.trim().toLowerCase();
    if (guess.length !== currentWord.length) {
        alert(`Please enter a ${currentWord.length}-letter word.`);
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
    const row = document.createElement('div');
    row.classList.add('guess-row');

    for (let i = 0; i < guess.length; i++) {
        const guessBox = document.createElement('div');
        guessBox.classList.add('guess-box');
        guessBox.textContent = guess[i];

        if (guess[i] === currentWord[i]) {
            guessBox.classList.add('correct');
        } else if (currentWord.includes(guess[i])) {
            guessBox.classList.add('present');
        } 
        row.appendChild(guessBox);
    }
    guessContainer.appendChild(row);
}

function endGame(win) {
    document.getElementById('word-input').disabled = true;
    if (win) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
    } else {
        document.getElementById('message').textContent = `No more guesses left! The word was: ${currentWord}`;
    }
}
