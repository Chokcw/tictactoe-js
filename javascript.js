

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
        while (i < 3) {
            let j = 0;
            let row = [];
            let column = [];
            
            while (j < 3) {
                row.push(_boardArray[i][j]);
                column.push(_boardArray[j][i])
                j++;
            }

            // console.log(`row: ${row}`);
            // console.log(`column: ${column}`);
            if ((row.every((symbol) => symbol === "X")  || row.every((symbol) => symbol === "O")) || 
                (column.every((symbol) => symbol === "X") || column.every((symbol) => symbol === "O"))) {
                return true;
            }
            i++;
        }
        return false;
    }

    // const hideBoard = () => {

    // }

    // const clearBoard = () => {

    // }

    
    return { createBoard, getBoard, checkGridEmpty, markGrid, checkWinPattern };
})();



const gameplay = (() => {

    // create board
    const _playerSymbols = ["X", "O"]
    let _turn = 0;
    let _currentplayerSymbol = _playerSymbols[_turn % 2];
    
    const setup = () => {
        board = gameboard;
        board.createBoard();
        board.getBoard().addEventListener("click", processPlayerMove);
    }

    const processPlayerMove = (e) => {
        console.log(`turn: ${_turn}`)
        grid = e.target;
        if (board.checkGridEmpty(grid.dataset.y, grid.dataset.x)) {
            board.markGrid(grid.dataset.y, grid.dataset.x, _currentplayerSymbol);
            grid.textContent = _currentplayerSymbol;
            checkWinner();

            _turn++;
            _currentplayerSymbol = _playerSymbols[_turn % 2]
        } else {
            console.log("Grid is marked");
        }
    }

    const checkWinner = () => {
        // board.checkWinPattern()
        if (board.checkWinPattern() === true) {
            console.log("Winning pattern!")
        }
        
        // for row and column and diagonal, check for same shape
        // or draw
        // if yes, gameEnd()
    }

    // const gameEnd = () => {
    //     // winner = 
    //     // board.hideGrid()
    // }
    
    
    return { setup }; 
})();



gameplay.setup();