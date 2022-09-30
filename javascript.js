

const gameboard = (() => {

    const _boardDiv = document.createElement("div");
    const _boardArray = [["", "", ""], ["", "", ""], ["", "", ""]]

    const createBoard = () => {
        
        const mainDiv = document.querySelector(".main");
        _boardDiv.classList.add("board");

        let i = 0;
        while (i < 9) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            grid.dataset.x = i % 3;
            grid.dataset.y = Math.floor(i / 3);

            _boardDiv.appendChild(grid);
            i++;
        };
        mainDiv.appendChild(_boardDiv);        
    }

    const getBoard = () => _boardDiv;

    const checkGridEmpty = (posY, posX) => {
        
        if (_boardArray[posY][posX] === "") {
            return true;
        }

        return false;
    }

    const markGrid = (posY, posX, symbol) => {
        _boardArray[posY][posX] = symbol;
    }

    const checkWinPattern = () => {
        let i = 0;
        let diagonalPos = [];
        let diagonalNeg = [];

        while (i < 3) {
            let j = 0;
            let row = [];
            let column = [];
            
            while (j < 3) {
                row.push(_boardArray[i][j]);
                column.push(_boardArray[j][i])
                j++;
            }
            
            if ((row.every((symbol) => symbol === "X")  || row.every((symbol) => symbol === "O")) || 
                (column.every((symbol) => symbol === "X") || column.every((symbol) => symbol === "O"))) {
                return true;
            }
            diagonalPos.push(_boardArray[i][i]);
            diagonalNeg.push(_boardArray[2-i][2-i]);
            i++;
        }

        if ((diagonalPos.every((symbol) => symbol === "X")  || diagonalPos.every((symbol) => symbol === "O")) || 
        (diagonalNeg.every((symbol) => symbol === "X") || diagonalNeg.every((symbol) => symbol === "O"))) {
            return true;
        }
        return false;
    }

    // const hideBoard = () => {

    // }

    // const clearBoard = () => {

    // }

    
    return { createBoard, getBoard, checkGridEmpty, markGrid, checkWinPattern };
})();


const playerFactory = (name, symbol) => {
    return { name, symbol };
};


const gameplay = (() => {

    let _turn = 0;
    let playerSymbols = undefined;
    let currentplayerSymbol = undefined
    
    const setup = (player1, player2) => {
        console.log(player1)
        board = gameboard;
        board.createBoard();
        board.getBoard().addEventListener("click", processPlayerMove);

        playerSymbols = [player1.symbol, player2.symbol]
        currentplayerSymbol = playerSymbols[_turn % 2];
    }

    const processPlayerMove = (e) => {
        console.log(`turn: ${_turn}`)
        grid = e.target;
        if (board.checkGridEmpty(grid.dataset.y, grid.dataset.x)) {
            board.markGrid(grid.dataset.y, grid.dataset.x, currentplayerSymbol);
            grid.textContent = currentplayerSymbol;
            checkWinner();

            _turn++;
            // if (_turn === 8) {
            //     declareDraw();
            // }
            currentplayerSymbol = playerSymbols[_turn % 2]
        } else {
            console.log("Grid is marked");
        }
    }

    const checkWinner = () => {
        if (board.checkWinPattern() === true) {
            console.log("Winning pattern!")
            // declareWinner()
        }
        
        // if yes, gameEnd()
    }

    // const declareWinner = () => {
    //     // winner = 
    //     // board.hideGrid()
    // }
    
    
    return { setup }; 
})();


const player1 = playerFactory("Player O", "O")
const player2 = playerFactory("Player X", "X")
// console.log(player1)
// gameplay(player1, player2);
gameplay.setup(player1, player2);