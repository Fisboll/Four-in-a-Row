const game = document.getElementById("gameContainer")
const playButton = documnet.getElementById("playButton")

function newGame(button) {
    button.style.display = "none";
    //Columns
    const columns = [];
    //array that stoes columns/rows
    const slotsArray = [];
    //determine the next color
    let nextColor = "red";
    //Create columns
    for (let i = 0; i < 7; i++) {
        const column = document.createElement('div');
        dispatchEvent.className = "column"
        column.className = "column";
        game.appendChild(column);
        columns.push(column);
    }
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
            //make Next element clickable
            if(slotsArray[this.column][this.row - 1]) {
                slotsArray[this.column][this.row - 1].element.classList.add(
                    "clickable",
                    nextColor
                );
            }

            console.log(slotsArray)

            //change next color
            nextColor == "red" ? nextColor = "yellow" : nextColor = "red"; 
        }
    }
    //create slots and push to columns
    columns.forEach((el, col) => {
        let slotColumn = [];
        for(i = 0; i < 6; i++){
            const div = document.createElement("div");
            div.classList.add("slot");
            el.appendChild(div);
            const slot = new Slot(div, col, i);
            slotColumn.push(slot);
            div.onclick = function() {
                slot.clicked();
            };
            div.style.top = i * 70 + 2 + "px";
        }
        slotsArray.push(slotColumn);
    });
    slotsArray.forEach(col=>{
        col[5].element.classList.add('clickable', nextColor);
    })
    console.log(slotsArray);
}
//check if game is draw
function isDraw(slotsArray){

}
//Check if there is a winner
function isWinner(slotsArray){

}
function gameOver(slotsArray){

}
function setScore(winner){

}
newGame(playButton);