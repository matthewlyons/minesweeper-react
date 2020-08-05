import React, { useState, useEffect, useContext } from 'react';
import Square from '../Square';

// Context
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';

export default function Board(props) {
  const {
    state,
    dispatch,
    newGame,
    runNeighbors,
    moveBomb,
    totalNeighbors
  } = useContext(StoreContext);

  let { gameBoard, width, height, bomb_percent, won, lost } = state;

  let victoryTotal = Math.round(width * height * (1 - bomb_percent));

  const [gameStarted, setGameStarted] = useState(false);
  const [cleared, setCleared] = useState(0);

  useEffect(() => {
    if (!lost && !won) {
      setGameStarted(false);
      setCleared(0);
    }
  }, [lost, won]);

  useEffect(() => {
    if (cleared >= victoryTotal) {
      dispatch({
        type: types.SET_WON,
        payload: true
      });
    }
  }, [cleared]);

  useEffect(() => {
    let clearedSquares = gameBoard
      .flat()
      .filter((element) => element.selected && element.type === 'clear');

    setCleared(clearedSquares.length);
  }, [gameBoard]);

  useEffect(() => {
    newGame();
  }, []);

  const setFlag = (y, x) => {
    let updatedBoard = [...gameBoard];

    updatedBoard[y][x].flag = !updatedBoard[y][x].flag;

    dispatch({
      type: types.SET_GAMEBOARD,
      payload: updatedBoard
    });
  };

  const clickSquare = (y, x) => {
    if (y < 0 || x < 0 || y > height - 1 || x > width - 1 || lost) {
      return;
    }

    let square = gameBoard[y][x];
    if (square.selected) {
      return;
    }
    if (square.type === 'bomb') {
      if (!gameStarted) {
        moveBomb(y, x);
      } else {
        dispatch({
          type: types.SET_LOST,
          payload: true
        });

        let updatedBoard = [...gameBoard];
        updatedBoard[y][x].selected = true;

        dispatch({
          type: types.SET_GAMEBOARD,
          payload: updatedBoard
        });
        return;
      }
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    let nearbyBombs = totalNeighbors(y, x);

    let updatedBoard = [...gameBoard];
    updatedBoard[y][x].selected = true;
    updatedBoard[y][x].bombs = nearbyBombs;

    dispatch({
      type: types.SET_GAMEBOARD,
      payload: updatedBoard
    });

    if (square.bombs === 0) {
      runNeighbors(y, x, clickSquare);
      return;
    } else {
      return square.bombs;
    }
  };

  return (
    <div className="GameBoard">
      {gameBoard.map((row, i) => (
        <div key={i} className="Row">
          {row.map((square, j) => {
            return (
              <Square
                className="Square"
                key={`${i}-${j}`}
                won={won}
                type={square.type}
                selected={square.selected}
                bombs={square.bombs}
                gameOver={lost}
                flag={square.flag}
                setFlag={setFlag}
                x={j}
                y={i}
                check={clickSquare}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
