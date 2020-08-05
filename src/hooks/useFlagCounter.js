import { useEffect, useState, useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export default function useFlagCounter() {
  const { state } = useContext(StoreContext);
  const [flags, setFlags] = useState(0);
  const [bombs, setBombs] = useState(10);

  const { gameBoard, height, width, bomb_percent } = state;
  useEffect(() => {
    let percent_bombs;
    if (bomb_percent > 1) {
      percent_bombs = 1;
    } else if (bomb_percent < 0) {
      percent_bombs = 0;
    } else {
      percent_bombs = bomb_percent;
    }
    let num_bombs = Math.round(width * height * percent_bombs);
    setBombs(num_bombs);
  }, []);

  useEffect(() => {
    let flaggedSquares = gameBoard.flat().filter((element) => element.flag)
      .length;
    let remaining = bombs - flaggedSquares > 0 ? bombs - flaggedSquares : 0;
    setFlags(remaining);
  }, [gameBoard]);

  return flags;
}
