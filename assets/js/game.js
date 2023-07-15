const game = document.getElementById("gameContainer");

let gameStarted = false
let playerOneName = 'Player 1'
let playerTwoName = 'CPU'
let playerCount = 1

let nextColor = "red";

let columns = [];
let slotsArray = [];

class Slot {
  constructor(element, column, row) {
    this.column = column;
    this.row = row;
    this.element = element;
    this.state = "";
  }
  clicked() {
    const el = this.element;
    if (!el.classList.contains("clickable")) return;
    el.style.backgroundColor = nextColor;
    this.state = nextColor;

    el.classList.remove("clickable");
    if (slotsArray[this.column][this.row - 1]) {
      slotsArray[this.column][this.row - 1].element.classList.add(
        "clickable",
        nextColor
      );
    }
    
    if (isDraw(slotsArray) == true) gameOver(undefined);

    if (isWinner(this.column, this.row, nextColor, slotsArray) == true)
      gameOver(nextColor);

    let oldColor = nextColor;
    nextColor == "red" ? nextColor = "yellow" : nextColor = "red";
    document.querySelectorAll(".clickable").forEach((el) => {
      el.classList.remove(oldColor);
      el.classList.add(nextColor);
    });
  }
}

function setupGame() {
  playerOneName = document.getElementById('player-one-name').value;
  if (playerOneName === "") playerOneName = 'Player 1'
  playerTwoName = document.getElementById('player-two-name').value;
  if (playerTwoName === "") playerTwoName = 'Player 2'

  let namePlayerOne = document.getElementById('playerOne');
  let namePlayerTwo = document.getElementById('playerTwo');
  namePlayerOne.innerHTML += " " + playerOneName;
  if (playerCount < 2) {
    namePlayerTwo.innerHTML += " CPU";
  } else {
    namePlayerTwo.innerHTML += " " + playerTwoName;
  }
  

  document.getElementById('game-setup').innerHTML = "";
  gameStarted = true
  newGame()
}

function hidePlayerTwo(input) {
  if (input) {
    document.getElementById('player-two-name-label').style.display = 'none';
    document.getElementById('player-two-name').style.display = 'none';
    playerCount = 1
  } else {
    document.getElementById('player-two-name-label').style.display = 'inline';
    document.getElementById('player-two-name').style.display = 'inline';
    playerCount = 2
  }
}

function newGame() {
  if (gameStarted) {
    boardBuilder();
  }
}

function boardBuilder() {
  for (let i = 0; i < 7; i++) {
    const column = document.createElement("div");
    column.className = "column";
    game.appendChild(column);
    columns.push(column);
  }
  columns.forEach((el, col) => {
    let slotColumn = [];
    for (i = 0; i < 6; i++) {
      const div = document.createElement("div");
      div.classList.add("slot");
      el.appendChild(div);
      const slot = new Slot(div, col, i);
      slotColumn.push(slot);
      div.onclick = function () {
        slot.clicked();
      };
      div.style.top = i * 100 + 2 + "px";
    }
    slotsArray.push(slotColumn);
  });
  slotsArray.forEach((col) => {
    col[5].element.classList.add("clickable", nextColor);
  });
}

//check if game is draw
function isDraw(slotsArray) {
  let isDraw = true;
  slotsArray.forEach((col) => {
    col.forEach((slot) => {
      if (slot.state == "") isDraw = false;
    });
  });
  return isDraw;
}

//test the lines to see if someone has won
function checkLines(lines, color, slotsArray) {
  let connectedSlots = 1; 
  lines.forEach((line) => {
    for (i = 0; i < line.length; i++) {
      const slotLocation = line[i];
      column = slotLocation[0];
      row = slotLocation[1];
      if (column >= 0 && column <= 6 && row >= 0 && row <= 5) {
        if (typeof slotsArray[column][row] !== "undefined") {
          if (slotsArray[column][row].state == color) {
            connectedSlots += 1;
          } else break;
        }
      } else break;
    }
  });
  if (connectedSlots >= 4) return true;
  return false;
}

//check if there is a winner
function isWinner(col, row, color, slotsArray) {
  const winningLines = {
    horizontal: [
      [
        [col - 1, row],
        [col - 2, row],
        [col - 3, row],
      ],
      [
        [col + 1, row],
        [col + 2, row],
        [col + 3, row],
      ],
    ],
    vertical: [
      [
        [col, row - 1],
        [col, row - 2],
        [col, row - 3],
      ],
      [
        [col, row + 1],
        [col, row + 2],
        [col, row + 3],
      ],
    ],
    diagonalLeft: [
      [
        [col - 1, row - 1],
        [col - 2, row - 2],
        [col - 3, row - 3],
      ],
      [
        [col + 1, row + 1],
        [col + 2, row + 2],
        [col + 3, row + 3],
      ],
    ],
    diagonalRight: [
      [
        [col - 1, row + 1],
        [col - 2, row + 2],
        [col - 3, row + 3],
      ],
      [
        [col + 1, row - 1],
        [col + 2, row - 2],
        [col + 3, row - 3],
      ],
    ],
  };

  if (checkLines(winningLines.horizontal, color, slotsArray) == true)
    return true;

  if (checkLines(winningLines.vertical, color, slotsArray) == true) return true;
  if (checkLines(winningLines.diagonalLeft, color, slotsArray) == true)
    return true;

  if (checkLines(winningLines.diagonalRight, color, slotsArray) == true)
    return true;

  return false;
}
//check if game is over
function gameOver(winner) {
  setScore(winner);
}
//set score on the scoreboard
function setScore(winner) {
  if (winner !== undefined) {
    document.getElementById(winner + "Score").innerHTML =
      parseInt(document.getElementById(winner + "Score").innerHTML) + 1;
  }

  displayPopup(winner);
}

function resetGame() {
  deleteGame();
  columns = [];
  slotsArray = [];

  newGame();
}

function deleteGame() {
  document.querySelectorAll(".column").forEach((column) => {
    column.innerHTML = "";
    column.parentNode.removeChild(column);
  });
}

function displayPopup(result) {
  const icon = result ? 'success' : 'info';
  const title = result ? `${result} Wins!` : 'Draw!';
  console.log(displayPopup)

  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2000
  }).then(() => { resetGame(); });
}
newGame();