import React, { createContext, useReducer } from 'react';
import { reducer, initialState, types } from './reducers';

const StoreContext = createContext(initialState);

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function chunkArray(array, x) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, x + index));
    index += x;
  }
  return chunked_arr;
}

function generateGameBoard(y, x, percent_bombs) {
  if (percent_bombs > 1) {
    percent_bombs = 1;
  } else if (percent_bombs < 0) {
    percent_bombs = 0;
  }

  let num_bombs = Math.round(x * y * percent_bombs);

  let bomb_arr = new Array(num_bombs).fill();
  for (let i = 0; i < bomb_arr.length; i++) {
    bomb_arr[i] = { type: 'bomb', selected: false, flag: false };
  }
  let clear_arr = new Array(x * y - num_bombs).fill();
  for (let i = 0; i < clear_arr.length; i++) {
    clear_arr[i] = { type: 'clear', selected: false, flag: false };
  }

  let shuffled_arr = shuffleArray([...bomb_arr, ...clear_arr]);

  let chunked_array = chunkArray(shuffled_arr, x);

  return chunked_array;
}

const StoreProvider = ({ children }) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [state, dispatch] = useReducer(reducer, initialState);

  function newGame() {
    let new_game_board = generateGameBoard(
      state.height,
      state.width,
      state.bomb_percent
    );

    dispatch({
      type: types.SET_WON,
      payload: false
    });

    dispatch({
      type: types.SET_LOST,
      payload: false
    });

    dispatch({
      type: types.SET_NEWGAME,
      payload: new_game_board
    });
  }

  function runNeighbors(y, x, func) {
    if (y > 0 && x > 0) func(y - 1, x - 1);
    if (y > 0) func(y - 1, x);
    if (y > 0 && x < state.width) func(y - 1, x + 1);
    if (x < state.width) func(y, x + 1);
    if (y < state.height && x < state.width) func(y + 1, x + 1);
    if (y < state.height) func(y + 1, x);
    if (y < state.height && x > 0) func(y + 1, x - 1);
    if (x > 0) func(y, x - 1);
  }

  function checkSquare(y, x) {
    if (y < 0 || x < 0 || y > state.height - 1 || x > state.width - 1) {
      return;
    }

    if (state.gameBoard[y][x].type !== 'bomb') return false;
    return true;
  }

  function totalNeighbors(y, x) {
    let total = 0;
    if (y > 0 && x > 0 && checkSquare(y - 1, x - 1)) total++;
    if (y > 0 && checkSquare(y - 1, x)) total++;
    if (y > 0 && x < state.width && checkSquare(y - 1, x + 1)) total++;
    if (x < state.width && checkSquare(y, x + 1)) total++;
    if (y < state.height && x < state.width && checkSquare(y + 1, x + 1))
      total++;
    if (y < state.height && checkSquare(y + 1, x)) total++;
    if (y < state.height && x > 0 && checkSquare(y + 1, x - 1)) total++;
    if (x > 0 && checkSquare(y, x - 1)) total++;
    return total;
  }

  function moveBomb(y, x) {
    state.gameBoard[y][x].type = 'clear';
    rowLoop: for (let i = 0; i < state.gameBoard.length; i++) {
      for (let j = 0; j < state.gameBoard[i].length; j++) {
        if (state.gameBoard[i][j].type === 'clear') {
          state.gameBoard[i][j].type = 'bomb';
          break rowLoop;
        }
      }
    }
  }

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        newGame,
        runNeighbors,
        totalNeighbors,
        moveBomb
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
