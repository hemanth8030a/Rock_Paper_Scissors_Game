// Game state
let playerScore = 0;
let computerScore = 0;
let playerName = '';

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const playerNameDisplay = document.getElementById('player-name-display');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resultMessage = document.getElementById('result-message');
const choices = document.querySelectorAll('.choice');
const gameResult = document.getElementById('game-result');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const playAgainBtn = document.getElementById('play-again');

// Event Listeners
startBtn.addEventListener('click', startGame);
choices.forEach(choice => choice.addEventListener('click', handleChoice));
playAgainBtn.addEventListener('click', resetRound);

function startGame() {
    playerName = playerNameInput.value.trim();
    if (!playerName) return;
    
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    playerNameDisplay.textContent = playerName;
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getChoiceEmoji(choice) {
    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    return emojis[choice];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function updateScore(result) {
    if (result === 'win') playerScore++;
    if (result === 'lose') computerScore++;
    
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function displayResult(result) {
    const messages = {
        win: 'You Win! 🎉',
        lose: 'Computer Wins! 😢',
        draw: "It's a Draw! 🤝"
    };
    resultMessage.textContent = messages[result];
}

function handleChoice(event) {
    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();
    
    playerChoiceDisplay.textContent = getChoiceEmoji(playerChoice);
    computerChoiceDisplay.textContent = getChoiceEmoji(computerChoice);
    
    const result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    displayResult(result);
    
    gameResult.classList.remove('hidden');
    choices.forEach(choice => choice.disabled = true);
}

function resetRound() {
    gameResult.classList.add('hidden');
    resultMessage.textContent = '';
    choices.forEach(choice => choice.disabled = false);
}