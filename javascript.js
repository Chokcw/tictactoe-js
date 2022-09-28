

// game start - create grid with 9 boxes, array 0-8
// board
// array 0-8

// check player turn


// function GameBoard() {
//     this.board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
// }



const gridFactory = () => {
    const grid = document.createElement("div");
    grid.classList.add("grid");

    const getGrid = () => grid;
    const markGrid = () => grid.textContent = "x";
    const clearGrid = () => grid.textContent = "";
    return { getGrid, markGrid, clearGrid};
};

// function markGrid(grid) {

// }



const gameboard = (() => {
    let _turn = 1;
    let _boardArray = [["", "", ""], ["", "", ""], ["", "", ""]]

    const displayBoard = () => {
        const mainDiv = document.querySelector(".main");
        const boardDiv = document.createElement("div");
        boardDiv.classList.add("board");

        let i = 0;
        while (i < 9) {  
            const gridObj = gridFactory();
            // gridObj.markGrid();
            boardDiv.appendChild(gridObj.getGrid());

            i++;
        };
        mainDiv.appendChild(boardDiv);
        // for x from 0 to 8, create a div and add to boardDiv
        // add boardDiv to main
    };

    // check legal move
    // check for winner
    //reset
    
    return {
        displayBoard,
    };
})();

gameboard.displayBoard();