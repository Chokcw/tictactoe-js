

// game start - create grid with 9 boxes, array 0-8
// board
// array 0-8

// check player turn


// function GameBoard() {
//     this.board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
// }


const playerFactory = (symbol) => {
    const playerSymbol = symbol;

    const getSymbol = () => playerSymbol;
    return {getSymbol};
};


const gridFactory = () => {
    const grid = document.createElement("div");
    grid.classList.add("grid");

    const getGrid = () => grid;
    const isGridEmpty = () => grid.textContent === "";







    const markGrid = (event, symbol) => {
        // grid.textContent = "X"
        if (grid.textContent === "") {
            grid.textContent = symbol;
        }
        // else {
        //     console.log("grid is not empty")
        // }
    };
    const clearGrid = () => grid.textContent = "";
    // const addEventListener = (symbol) => grid.addEventListener("click", function(event) {markGrid(event, symbol)})
    const addEventListener = grid.addEventListener("click", checkEmpty);

    return {getGrid, isGridEmpty, markGrid, clearGrid, addEventListener};
};



const gameboard = (() => {
    
    let _boardArray = []
    const mainDiv = document.querySelector(".main");
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    const createBoard = () => {
        let i = 0;
        while (i < 9) {  
            const gridObj = gridFactory();
            boardDiv.appendChild(gridObj.getGrid());
            _boardArray.push(gridObj);

            i++;
        };
        mainDiv.appendChild(boardDiv);
        // for x from 0 to 8, create a div and add to boardDiv
    };

    const getBoard = () => {
        return _boardArray;
    }
    
    const boardClick 

    // const clearBoard = () => {}
    // check legal move
    // check for winner
    //reset
    
    return {
        createBoard,
        getBoard,
    };
})();



const gameplay = (() => {
    let _turn = 1;
    // board = board;
    
    const getUserMove = (board) => {
        console.log(board);
        for (const grid of board) {
            grid.addEventListener();
        }

        board.addEventListener
        
    };






    // const players = [playerFactory("X"), playerFactory("O")]
    // currentPlayer = players[ _turn % 2 ];
    
    

    // if (_turn === 3) {
    //     console.log("Game end!")
    // }


    // const getPlayerMove = () => {
    //     // check if grid is empty
    //     // update board
    //     // check for winner
    //     // update turn

    // }
    
    return { startGame }; 
})();

// game = gameplay();
// game.startGame(gameboard);


gameboard.createBoard();
const board = gameboard.getBoard();
// console.log(board);
gameplay.startGame(board);


