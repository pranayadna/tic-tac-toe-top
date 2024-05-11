function createGameboard() {
  const rows = 3;
  const columns = 3;
  const board = []; 

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }  
  }

  const getBoard = () => board;

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
    console.log(board.getBoard());
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkForWinner = () => {
    const boardState = board.getBoard();

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
    for (let i = 0; i < 3; i++) {
      if (checkConsecutive(boardState[i])) {
        console.log(`Horizontal wins at row ${i}`);
        return players.find(player => player.marker === boardState[i][0]);
      } 
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
      const columnMarkers = [];
      for (let j = 0; j < 3; j++) {
        columnMarkers.push(boardState[j][i]);  
      }
      if (checkConsecutive(columnMarkers)) {
        console.log(`Vertical wins at col ${i}`);
        return players.find(player => player.marker === columnMarkers[0])
      }     
    }

    // Main diagonal
    const mainDiagonalMarkers = [
      boardState[0][0],
      boardState[1][1],
      boardState[2][2],
    ];

    if (checkConsecutive(mainDiagonalMarkers)) {
      console.log("Main diagonal wins");
      return players.find(player => player.marker === mainDiagonalMarkers[0])
    }

    // Anti diagonal
    const antiDiagonalMarkers = [
      boardState[0][2],
      boardState[1][1],
      boardState[2][0],
    ];
    
    if (checkConsecutive(antiDiagonalMarkers)) {
      console.log("Anti diagonal wins");
      return players.find(player => player.marker === antiDiagonalMarkers[0])
    }

    return null;
  }

  const checkForDraw = () => {
    const boardState = board.getBoard();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardState[i][j] === "") {
          return false;
        }
      }
    }
    
    return true;
  }

  const playRound = (row, column) => {
    console.log(`Dropping ${getActivePlayer().name}'s marker into row ${row} and column ${column}`);
    board.placeMarker(row, column, getActivePlayer().marker);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. 
    */
    const winner = checkForWinner();
    if (winner) {
      console.log(`The winner is ${winner.name}'s`);
      return;
    } 
    
    const draw = checkForDraw();
    if (draw) {
      console.log("It's draw");
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    printNewRound,
    playRound,
    getActivePlayer
  };
}

const game = createGameController();