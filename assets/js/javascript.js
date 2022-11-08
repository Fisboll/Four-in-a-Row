function newGame(button) {
    button.style.display = "none";
    const game = document.getElementById("gameContainer")
    //Columns
    const columns = [];
    //array that stoes columns/rows
    const slotsArray = [];
    //determine the next color
    let nextColor = "red";
    //Create columns
    for (let i = 0; i < 10; i++) {
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
        clicked() {}
    }
    //create slots and push to columns
    columns.forEach((el, col) => {
        let slotColumn = [];
        for(i = 0; i < 9; i++){
            const div = document.createElement("div");
            div.classList.add("slot");
            el.appendChild(div);
            const slot = new Slot(div, col, i);
            slotColumn.push(slot);
            div.onclick = function() {
                slot.clicked();
            };
        }
        slotsArray.push(slotColumn);
    });
    console.log(slotsArray);
}

newGame(document.getElementById("playButton"));