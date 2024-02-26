import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBOS } from "./winning-combos";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function derivedGameBoard(gameTurns) {
  //Shallow copy
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard) {
  let winner;
  for (const combo of WINNING_COMBOS) {
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].col];
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].col];
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].col];

    //winning logic
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = PLAYERS[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  //Switching turns on btn-press
  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);

  //DRAW logic
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  //Rematch logic
  function handleRematch() {
    setGameTurns([]);
  }

  //Setting the player's name
  function handleNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div className="" id="game-container">
        {/* PLAYER NAMES and their SYMBOLS*/}
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handleNameChange} />
          <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handleNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
