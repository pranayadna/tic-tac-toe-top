function createGameboard() {
  const rows = 3;
  const columns = 3;
  const board = []; // array inside gameboard object

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }  
  }

  const getBoard = () => console.log(board);

  const placeMarker = (row, col, player) => board[row][col] = player;

  return { getBoard, placeMarker };
}

function createGameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = createGameboard();

  const players = [
    {
      name: playerOneName,
      marker: "X"
    },
    {
      name: playerTwoName,
      marker: "O"
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.getBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(`Dropping ${getActivePlayer().name}'s marker into row ${row} and column ${column}`);
    board.placeMarker(row, column, getActivePlayer().marker);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. 
    */
    const rows = 3;
    const columns = 3;
    const board = [];

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const players = [
        {
          name: playerOneName,
          marker: "X"
        },
        {
          name: playerTwoName,
          marker: "O"
        },
    ];

    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push("")
        }
    }

    function placeMarker(row, col, player) {
        // board[row][col].addMarker(player);
        // if (board[row][col] === "X" || board[row][col] === "O") {
        //     return;
        // }

        board[row][col] = player;

        return board;
    }


    function winningCondition() {
        const checkConsecutive = (tokens) => {
            for (let i = 0; i < tokens.length; i++) {
                if (
                    tokens[i] !== "" &&
                    tokens[i] === tokens[i + 1] &&
                    tokens[i] === tokens[i + 2] 
                ) {
                    return true;
                }
            }
            return false;
        };

        // Horizontal
        for (let i = 0; i < rows; i++) {
            if (checkConsecutive(board[i])) {
                console.log(`Horizontal wins at row ${i}`);
                return players.find(player => player.marker === board[i][0]);
            } 
        }

        // Vertical
        for (let i = 0; i < columns; i++) {
            const columnMarkers = [];
            for (let j = 0; j < rows; j++) {
                columnMarkers.push(board[j][i]);  
            }
            if (checkConsecutive(columnMarkers)) {
                console.log(`Vertical wins at col ${i}`);
                return players.find(player => player.marker === columnMarkers[0])
            }     
        }

        // Main diagonal
        for (let i = 0; i < rows - 2; i++) {
            for (let j = 0; j < columns - 2; j++) {
                const mainDiagonalMarkers = [
                    board[i][j],
                    board[i + 1][j + 1],
                    board[i + 2][j + 2],
                ];
                if (checkConsecutive(mainDiagonalMarkers)) {
                    console.log("Main diagonal wins");
                    return players.find(player => player.marker === mainDiagonalMarkers[0])
                }
            }
        }
    
        // Anti diagonal
        for (let i = 0; i < rows - 2; i++) {
            for (let j = 2; j < columns; j++) {
                const antiDiagonalMarkers = [
                    board[i][j],
                    board[i + 1][j - 1],
                    board[i + 2][j - 2],
                ];
                if (checkConsecutive(antiDiagonalMarkers)) {
                    console.log("Anti diagonal wins");
                    return players.find(player => player.marker === antiDiagonalMarkers[0])
                }
            }
        }
        //     return board[row];
        // }
        // let winningArr = [];

        // Can be performed on a separate function
        // Horizontal win
        // let firstRow = board[0]; // board[row]

        // // for (let i = 0; i < rows; i++) {
        // //     firstRow.push(board[i])
        // // }

        // let isFirstRowEqualX = firstRow.every(item => item === "X");
        // let isFirstRowEqualO = firstRow.every(item => item === "O");

        // if (isFirstRowEqualX) {
        //     console.log("Horizontal wins at row 0")
        //     return players.find(player => player.marker === "X")
        // } else if(isFirstRowEqualO) {
        //     console.log("Horizontal wins at row 0")
        //     return players.find(player => player.marker === "O")
        // }
    
        // let secondRow = board[1]; // board[row]

        // let isSecondRowEqualX = secondRow.every(item => item === "X");
        // let isSecondRowEqualO = secondRow.every(item => item === "O");

        // if (isSecondRowEqualX) {
        //     console.log("Horizontal wins at row 1")
        //     return players.find(player => player.marker === "X")
        // } else if(isSecondRowEqualO) {
        //     console.log("Horizontal wins at row 1")
        //     return players.find(player => player.marker === "O")
        // }

        // let thirdRow = board[2]; // board[row]
    
        // let isThirdRowEqualX = thirdRow.every(item => item === "X");
        // let isThirdRowEqualO = thirdRow.every(item => item === "O");

        // if (isThirdRowEqualX) {
        //     console.log("Horizontal wins at row 2")
        //     return players.find(player => player.marker === "X")
        // } else if(isThirdRowEqualO) {
        //     console.log("Horizontal wins at row 2")
        //     return players.find(player => player.marker === "O")
        // }
    
        // // Vertical win
        // let firstColumn = []; 

        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j <= 0; j++) {
        //         firstColumn.push(board[i][0]);
        //     }
        // }

        // let isFirstColumnEqualX = firstColumn.every(item => item === "X");
        // let isFirstColumnEqualO = firstColumn.every(item => item === "O");

        // if (isFirstColumnEqualX) {
        //     console.log("Vertical wins at col 0")
        //     return players.find(player => player.marker === "X")
        // } else if(isFirstColumnEqualO) {
        //     console.log("Vertical wins at col 0")
        //     return players.find(player => player.marker === "O")
        // }
        
        // let secondColumn = []; 

        // for (let i = 0; i < rows; i++) {
        //     for (let j = 1; j <= 1; j++) {
        //         secondColumn.push(board[i][1]);
        //     }
        // }

        // let isSecondColumnEqualX = secondColumn.every(item => item === "X");
        // let isSecondColumnEqualO = secondColumn.every(item => item === "O");

        // if (isSecondColumnEqualX) {
        //     console.log("Vertical wins at col 1")
        //     return players.find(player => player.marker === "X")
        // } else if(isSecondColumnEqualO) {
        //     console.log("Vertical wins at col 1")
        //     return players.find(player => player.marker === "O")
        // }
        
        // let thirdColumn = []; 

        // for (let i = 0; i < rows; i++) {
        //     for (let j = 2; j <= 2; j++) {
        //         thirdColumn.push(board[i][2]);
        //     }
        // }

        // let isThirdColumnEqualX = thirdColumn.every(item => item === "X");
        // let isThirdColumnEqualO = thirdColumn.every(item => item === "O");

        // if (isThirdColumnEqualX) {
        //     console.log("Vertical wins at col 2")
        //     return players.find(player => player.marker === "X")
        // } else if(isThirdColumnEqualO) {
        //     console.log("Vertical wins at col 2")
        //     return players.find(player => player.marker === "O")
        // }
        
        // // Main diagonal win
        // let mainDiagonal = [];
        
        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < columns; j++) {
        //         if (i === j) {
        //             mainDiagonal.push(board[i][j]);
        //         }
        //     }
        // }
            
        // let isMainDiagonalEqual = mainDiagonal.every(item => item === "X");
        
        // // Anti diagonal win
        // let antiDiagonal = [];
        
        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < columns; j++) {
        //         if ((i === 0 && j === 2) 
        //             // &&
        //             // (i === 1 && j === 1) &&
        //             // (i === 2 && j === 0)
        //         ) {
        //             antiDiagonal.push(board[i][j]);
        //         }

        //         if ((i === 1 && j === 1)) {
        //             antiDiagonal.push(board[i][j]);
        //         }
                
        //         if ((i === 2 && j === 0)) {
        //             antiDiagonal.push(board[i][j]);
        //         }
        //     }
        // }
            
        // let isAntiDiagonalEqual = antiDiagonal.every(item => item === "X");
    
        // // if (isFirstRowEqual) {
        // //     return
        // // }

        // return { checkConsecutive };

        return null;
    }
    console.log(placeMarker(0, 0, "X"));
    console.log(placeMarker(1, 1, "X"));
    console.log(placeMarker(2, 2, "X"));

    console.log(board[0].length);

    const winning = winningCondition();

    console.log(winning);
  

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    // printNewRound,
    playRound,
    getActivePlayer
  };
}

const game = createGameController();