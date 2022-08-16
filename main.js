// import { sum, multiply } from "./mudules.js";
import def from "./mudules.js";

// console.log(sum(6,8));

// console.log(multiply(2,4));
console.log(def);


const $ = selector => document.querySelector(selector);

const board = [
	[''],[''],[''],
	[''],[''],[''],
	[''],[''],['']
];

let turn = 0; // 0 user, 1 pc
const boardContainer = $('#board');
const playerDiv = $('#player');

startGame();

function startGame (){
	renderBoard();
	turn = Math.random() < 0.5 ? 0 : 1;

	renderCurrentPlayer();

	turn == 0 ? playerPlay() : pcPlay();
}

function playerPlay() {
	const cells = document.querySelectorAll(".cell");
	console.log(board);

	cells.forEach((cell,key)=>{
		const column = key % 3;
		const row = parseInt(key / 3);

		if (!board[row][column]) {
			cell.addEventListener('click', e=>{
				board[row][column] = 'O';
				cell.textContent = board[row][column];

				turn = 1;
				pcPlay();
			});
		}
	});
}

function pcPlay () {
	renderCurrentPlayer();

	setTimeout(()=>{
		let played = false;
		const options = checkOptionsToWin();
	}, 1500);
}

function checkOptionsToWin(){

}

function renderCurrentPlayer() {
	playerDiv.textContent = `${turn == 0 ? 'Player Turn' : 'PC Turn'}`;
}

function renderBoard () {
	const html = board.map(row => {
		const cells = row.map(cell => {
			return `<button class="cell">${cell}</button>`
		})
		return `<div class="row">${cells.join('')}</div>`
	});
	boardContainer.innerHTML = html.join('');
}

