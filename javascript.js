

const gameboard = (() => {

    const _boardDiv = document.createElement("div");
    let _boardArray = [["", "", ""], ["", "", ""], ["", "", ""]]

    const createBoard = () => {
        
        const mainDiv = document.querySelector(".main");
        _boardDiv.classList.add("board");
        _boardDiv.textContent = '';

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

    const clearBoard = () => {
        _boardArray = [["", "", ""], ["", "", ""], ["", "", ""]]
    }

    
    return { createBoard, getBoard, checkGridEmpty, markGrid, checkWinPattern, clearBoard };
})();


const playerFactory = (name, symbol) => {
    let score = 0;
    return { name, symbol, score };
};


const gameplay = (() => {

    let _turn = 0;
    let _isGameActive = false;
    const player1 = playerFactory("Player O", "O");
    const player2 = playerFactory("Player X", "X");
    const _players = [player1, player2];
    let _currentPlayer = _players[_turn % 2];
    let _scoreDiv = document.querySelector(".score");
    let _resultDiv = document.querySelector(".result");
    const _restartButton = document.querySelector(".restart-button");
    
    const setup = () => {
        _turn = 0;
        _isGameActive = true;
        _currentPlayer = _players[_turn % 2];
        board = gameboard;
        board.clearBoard();
        board.createBoard();
        displayScore();
        board.getBoard().addEventListener("click", processPlayerMove);
    }

    const processPlayerMove = (e) => {
        if (_isGameActive === true && e.target.classList.contains("grid")) {
            console.log(`turn: ${_turn}`);
            grid = e.target;
            if (board.checkGridEmpty(grid.dataset.y, grid.dataset.x)) {
                board.markGrid(grid.dataset.y, grid.dataset.x, _currentPlayer.symbol);
                content = document.createElement("p");
                content.textContent = _currentPlayer.symbol;
                grid.appendChild(content);

                checkWinner();

                _turn++;
                if (_turn === 9 && _isGameActive === true) {
                    declareDraw();
                    _isGameActive = false;
                }
                _currentPlayer = _players[_turn % 2];
            } else {
                console.log("Grid is marked");
            }
        }
    }

    const checkWinner = () => {
        if (board.checkWinPattern() === true) {
            console.log("Winning pattern!");
            _isGameActive = false;
            declareWinner();
        }
    }

    const declareWinner = () => {
        winner = _currentPlayer;
        _currentPlayer.score += 1;
        _resultDiv.classList.toggle('display-element');
        displayScore();
        
        _resultDiv.textContent = `${_currentPlayer.name} wins!`
        displayRestart();
        // board.hideGrid()
    }

    const declareDraw = () => {
        _resultDiv.textContent = "Draw!"
        _resultDiv.classList.toggle('display-element');
        displayRestart();
    }

    const displayScore = () => {
        _scoreDiv.textContent = '';
        for (player of _players) {
            let playerDiv = document.createElement("div");
            playerDiv.classList.add("player-score");
            playerDiv.textContent = `${player.name}: ${player.score}`;
            _scoreDiv.appendChild(playerDiv);
        }
        
    }

    const displayRestart = () => {
        _restartButton.classList.toggle('display-element');
        _restartButton.addEventListener("click", restartGame);
    }

    const restartGame = () => {
        setup();
        _resultDiv.classList.toggle('display-element');
        _restartButton.classList.toggle('display-element');
    }
    
    return { setup }; 
})();


gameplay.setup();