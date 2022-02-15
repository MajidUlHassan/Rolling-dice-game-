'use strict';

// Creating the variables of HTML elements
const btnNewGameEl = document.querySelector('.btn-new-game');
const btnRollDiceEl = document.querySelector('.btn-roll-dice');
const btnHoldEl = document.querySelector('.btn-hold');
const diceEl = document.querySelector('.dice');
const currentScoreEl1 = document.querySelector('.current-score-1');
const currentScoreEl2 = document.querySelector('.current-score-2');
const totalScore1El = document.querySelector('.total-score-1');
const totalScore2El = document.querySelector('.total-score-2');
const playerSection1 = document.querySelector('.player-section-1');
const playerSection2 = document.querySelector('.player-section-2');
let currentScore = 0;
let activePlayer = 2;
let totalScore1 = 0;
let totalScore2 = 0;
diceEl.classList.add('hidden');

// Method to switch players
function switchPlayer() {
	if (totalScore1 >= 100 || totalScore2 >= 100) {
		winner();
	} else {
		if (activePlayer % 2 === 0) {
			playerSection1.style.opacity = '50%';
			playerSection2.style.opacity = '100%';
			document.querySelector('.current-score-1').textContent = 0;
		} else {
			playerSection1.style.opacity = '100%';
			playerSection2.style.opacity = '50%';
			document.querySelector('.current-score-2').textContent = 0;
		}
	}
}
// Announcing the winner
function winner() {
	if (totalScore1 >= 100) {
		playerSection1.style.backgroundColor = '#333';
		document.querySelector('.player-1').style.color = '#1dc973';
	} else if (totalScore2 >= 100) {
		playerSection2.style.backgroundColor = '#333';
		document.querySelector('.player-2').style.color = '#1dc973';
	}
	diceEl.classList.add('hidden');
	btnHoldEl.disabled = true;
	btnRollDiceEl.disabled = true;
}
// Resetting the values back
function resetGame() {
	currentScore = 0;
	totalScore1 = 0;
	totalScore2 = 0;
	activePlayer = 2;
	currentScoreEl1.textContent = 0;
	currentScoreEl2.textContent = 0;
	totalScore1El.textContent = 0;
	totalScore2El.textContent = 0;
	diceEl.classList.add('hidden');
	btnHoldEl.disabled = false;
	btnRollDiceEl.disabled = false;
	playerSection1.style.opacity = '100%';
	playerSection1.style.backgroundColor = '#b3ffd9';
	playerSection2.style.opacity = '50%';
	playerSection2.style.backgroundColor = '#b3ffd9';
	document.querySelector('.player-1').style.color = '#000';
	document.querySelector('.player-2').style.color = '#000';
}
// Rolling the dice
btnRollDiceEl.addEventListener('click', function () {
	let dice = Math.trunc(Math.random() * 6 + 1);
	diceEl.src = `dice-${dice}.png`;
	diceEl.classList.remove('hidden');
	// If dice != 1. just add dice to current score
	if (dice !== 1) {
		currentScore += dice;
		if (activePlayer % 2 === 0) {
			currentScoreEl1.textContent = currentScore;
			currentScoreEl2.textContent = 0;
		} else {
			currentScoreEl2.textContent = currentScore;
			currentScoreEl1.textContent = 0;
		}
	}
	// If dice == 1, just switch the player
	else {
		switchPlayer();
		currentScore = 0;
		activePlayer += 1;
	}
});

btnHoldEl.addEventListener('click', function () {
	if (activePlayer % 2 === 0) {
		totalScore1 += currentScore;
		totalScore1El.textContent = totalScore1;
	} else {
		totalScore2 += currentScore;
		totalScore2El.textContent = totalScore2;
	}
	switchPlayer();
	activePlayer += 1;
	currentScore = 0;
});

// Resetting the game back to it's initial stage
btnNewGameEl.addEventListener('click', function () {
	resetGame();
});
