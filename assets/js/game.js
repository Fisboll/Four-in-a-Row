const game = document.getElementById("gameContainer");

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



function newGame() {
  boardBuilder();
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
      div.style.top = i * 70 + 2 + "px";
    }
    slotsArray.push(slotColumn);
  });
  slotsArray.forEach((col) => {
    col[5].element.classList.add("clickable", nextColor);
  });
}