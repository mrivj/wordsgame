let time = 30;
let score = 0;
let timerInterval;
let currentWordIndex = 0;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('word-input').addEventListener('input', checkWord);

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
    time = 30;
    score = 0;
    currentWordIndex = 0;
    document.getElementById('time').textContent = time;
    document.getElementById('score-value').textContent = score;
    document.getElementById('word-input').value = '';
    document.getElementById('word-input').disabled = false;
    document.getElementById('word-input').focus();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    displayNewWord();
}

function updateTimer() {
    time--;
    document.getElementById('time').textContent = time;
    if (time === 0) {
        clearInterval(timerInterval);
        document.getElementById('word-input').disabled = true;
        alert('Time is up! Your score is ' + score);
    }
}

function checkWord() {
    const word = document.getElementById('word-input').value.trim().toLowerCase();
    if (word === words[currentWordIndex]) {
        score++;
        document.getElementById('score-value').textContent = score;
        document.getElementById('word-input').value = '';
        displayNewWord();
    }
}

function displayNewWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    const newWord = words[currentWordIndex];
    document.getElementById('word-input').setAttribute('placeholder', `Type: ${newWord}`);
}
