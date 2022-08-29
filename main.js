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

  turn == 0 ? playerTurn() : pcTurn();

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
  renderText('PLAYER Turn');
  document.querySelectorAll('.cell').forEach((cell,key)=>{
    const row = parseInt(key / 3);
    const col = parseInt(key % 3);
    if (cell.textContent == "") {
      cell.addEventListener('click', function () {
        board[row][col] = "O";
        cell.textContent = board[row][col];

        let result = isThereWinner('player');
        
        if (result == "none") {
          turn = 1;
          pcTurn();
          return false;
        }
        if (result == "draw") {
          renderText('Draw');
          cell.removeEventListener('click', this);
          return false;
        }

        if (result == "playerwon" || result == "pcwon") {
          document.querySelectorAll('.cell').removeEventListener('click', this);
          return false;
        }

      });
    }
  });
}


function pcTurn () {
  renderText('PC Turn');

  setTimeout(() => {
    let played = false;
    debugger;
    let optionsToWin = checkPossiblePlay();
    if ( optionsToWin.length ) {
      let arrOptionSelected = optionsToWin[0];
      arrOptionSelected.forEach(option => {
        if (option.value === 0) {
          board[option.i][option.j] = "X";
          played = true;
        }
      });

    } else {
      //walk the array to find the first available cell
      for (let i = 0; i < board.length; i++) {
        if (played) {
          break;
        }
        for (let j = 0; j < board.length; j++) {
          if (board[i][j] === "" && !played) {
            board[i][j] = "X";
            played = true;
            break;
          }
        }
      }

    }
    renderBoard();

    let result = isThereWinner('pc');
    
    if (result == "none") {
      turn = 0;
      playerTurn();
      return false;
    }
    if (result == "draw") {
      renderText('Draw');
      return false;
    }
    if (result == "playerwon" || result == "pcwon") {
      document.querySelectorAll('.cell').removeEventListener('click', this);
      return false;
    }
  }, 1);
}

function isThereWinner (typeUser) {
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
    p1 === "X" && p2 === "X" && p3 === "X",
    p4 === "X" && p5 === "X" && p6 === "X",
    p7 === "X" && p8 === "X" && p9 === "X",
    p1 === "X" && p4 === "X" && p7 === "X",
    p2 === "X" && p5 === "X" && p8 === "X",
    p3 === "X" && p6 === "X" && p9 === "X",
    p1 === "X" && p5 === "X" && p9 === "X",
    p3 === "X" && p5 === "X" && p7 === "X",
  ];

  const playerOptionsToWin = [
    p1 === "O" && p2 === "O" && p3 === "O",
    p4 === "O" && p5 === "O" && p6 === "O",
    p7 === "O" && p8 === "O" && p9 === "O",
    p1 === "O" && p4 === "O" && p7 === "O",
    p2 === "O" && p5 === "O" && p8 === "O",
    p3 === "O" && p6 === "O" && p9 === "O",
    p1 === "O" && p5 === "O" && p9 === "O",
    p3 === "O" && p5 === "O" && p7 === "O",

  ];

  if (typeUser == "player" && playerOptionsToWin.includes(true)) {
    renderText('PLAYER WINS...');
    return 'playerwon';
  } else if (typeUser == "pc" && pcOptionsToWin.includes(true)) {
    renderText('PC WINS...');
    return 'pcwon';
  }

  // check draw
  let draw = true;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "") {
        return 'none';
      }
    }
  }
  return draw ? 'draw' : 'none';

}

function checkPossiblePlay () {
  //deep copy of global arr
  let boardCopy = JSON.parse(JSON.stringify(board));

  //walk new array and check if value is "X", "O" or empty and replace it for an object
  for (let i = 0; i < boardCopy.length; i++) {
    for (let j = 0; j < boardCopy.length; j++) {
      switch (boardCopy[i][j]) {
        case "X":
          boardCopy[i][j] = { value: 1, i, j };
          break;
        case "O":
          boardCopy[i][j] = { value: -2, i, j};
          break;
        default:
          boardCopy[i][j] = { value: 0, i, j};
        break;
      }
    }
  }

  let p1 = boardCopy[0][0];
  let p2 = boardCopy[0][1];
  let p3 = boardCopy[0][2];
  let p4 = boardCopy[1][0];
  let p5 = boardCopy[1][1];
  let p6 = boardCopy[1][2];
  let p7 = boardCopy[2][0];
  let p8 = boardCopy[2][1];
  let p9 = boardCopy[2][2];

  let s1 = [p1, p2, p3];
  let s2 = [p4, p5, p6];
  let s3 = [p7, p8, p9];
  let s4 = [p1, p4, p7];
  let s5 = [p2, p5, p8];
  let s6 = [p3, p6, p9];
  let s7 = [p1, p5, p9];
  let s8 = [p3, p5, p7];

  let allOptions = [s1, s2, s3, s4, s5, s6, s7, s8].filter(option => {
    return (
      option[0].value + option[1].value + option[2].value === 2 || 
      option[0].value + option[1].value + option[2].value === -4 
    );
  });

  return allOptions;
}

btnReset.addEventListener('click', e => {
  board = [
    ["","",""],
    ["","",""],
    ["","",""]
  ];
  startGame();
});



