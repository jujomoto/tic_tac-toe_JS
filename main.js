const $ = selector => document.querySelector(selector);

const playerDiv = $('#player');
const boardDiv = $('#board');
const btnReset = $('#btn');

let turn = null; //0:player, 1:pc
let text = null;
let board = [
  ["","",""],
  ["","",""],
  ["","",""]
];


startGame();

function startGame () {
  renderBoard();
  turn = Math.random() < 0.5 ? 0 : 1;
  
  if (turn  == 0) {
    playerTurn();
    text = "Player Turn";
  } else {
    pcTurn();
    text = "PC Turn";
  }
  renderText(text);

}

function renderBoard () {
  let htmlBoard = board.map(row => {
    const cells = row.map(cell => {
      return `<button class="cell">${cell}</button>`
    });
    return `<div class="row">${cells.join("")}</div>`;
  });
  console.log(htmlBoard);
  boardDiv.innerHTML = htmlBoard.join("");
}

function renderText (message) {
  playerDiv.textContent = message;
}

function playerTurn () {
  document.querySelectorAll('.cell').forEach((cell,key)=>{
    const row = parseInt(key / 3);
    const col = parseInt(key % 3);
    if (cell.textContent == "") {
      cell.addEventListener('click', function () {
        board[row][col] = "O";
        cell.textContent = board[row][col];

        turn = 1;
        let result = isThereWinner();

        if (result == "none") {
          pcTurn();
          return false;
        }
        if (result == "draw") {
          renderText('Draw');
          cell.removeEventListener('click', this);
          return false;
        }

      });
    }
  });
}


function pcTurn () {
  renderText('PC Turn');

}

function isThereWinner () {
  const p1 = board[0][0];
  const p2 = board[0][1];
  const p3 = board[0][2];
  const p4 = board[1][0];
  const p5 = board[1][1];
  const p6 = board[1][2];
  const p7 = board[2][0];
  const p8 = board[2][1];
  const p9 = board[2][2];

  const pcOptionsToWin = [
    p1 === "X" && p2 === "X" && p3 === "XXX",
    p4 === "X" && p5 === "X" && p6 === "XXX",
    p7 === "X" && p8 === "X" && p9 === "XXX",
    p1 === "X" && p4 === "X" && p7 === "XXX",
    p2 === "X" && p5 === "X" && p8 === "XXX",
    p3 === "X" && p6 === "X" && p9 === "XXX",
    p1 === "X" && p5 === "X" && p9 === "XXX",
    p3 === "X" && p5 === "X" && p7 === "XXX",
  ];

  const playerOptionsToWin = [
    p1 === "O" && p5 === "O" && p9 === "O",
    p7 === "O" && p5 === "O" && p3 === "O",
    p1 === "O" && p4 === "O" && p7 === "O",
    p2 === "O" && p5 === "O" && p8 === "O",
    p3 === "O" && p6 === "O" && p9 === "O",
    p1 === "O" && p2 === "O" && p3 === "O",
    p4 === "O" && p5 === "O" && p6 === "O",
    p7 === "O" && p8 === "O" && p9 === "O",
  ];

}


