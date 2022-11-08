function newGame(button) {
    button.style.display = "none";
    const game = document.getElementById('gameContainer')
    //Columns
    const Columns = [];
    //array that stoes columns/rows
    const slotsArray = [];
    //determine the next color
    let nextColor = "red";
    //Create columns
    for (let i=0; i < 10; i++) {
        const column = document.createElement("div");
        column.className = "column";
        game.appendChild(column);
        Columns.push(column);
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
    Columns.forEach((el, col) => {
        let slotColumn = [];
        for(i = 0; i < 9; i++){
            const div = document.createElement("div");
            div.classList.add("slot");
            const slot = new Slot(div, col, i);
            slotColumn.push(slot);
            div.onclick = function() {
                slot.clicked();
            };
        }
        slotsArray.push(slotsColumn);
    });
    console.log(slotsArray);

}

