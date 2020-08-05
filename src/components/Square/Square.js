import React, { useState, useEffect } from 'react';

import useColor from '../../hooks/useColor';

export default function Square(props) {
  let {
    x,
    y,
    check,
    selected,
    type,
    bombs,
    gameOver,
    flag,
    setFlag,
    won
  } = props;

  // const [flag, setFlag] = useState(false);
  const [inner, setInner] = useState('');

  let color = useColor(inner);

  let classes = ['Square'];

  if (selected) {
    classes.push('Selected');
    if (type === 'bomb') {
      classes.push('Explosion');
    }
  }

  if (gameOver) {
    classes.push('GameOver');
    if (type === 'bomb') {
      classes.push('Selected');
    }
  }
  if (won) {
    classes.push('GameOver');
  }

  const leftClick = () => {
    if (gameOver || won) return;
    if (!selected) {
      let result = check(y, x);
      if (result !== false) {
        if (result !== 0) {
          setInner(result);
        }
      }
    }
  };

  const rightClick = (e) => {
    e.preventDefault();
    if (gameOver || won) return;
    setFlag(y, x);
  };

  useEffect(() => {
    if (!selected) {
      let display = flag ? '🚩' : '';
      setInner(display);
    } else {
      if (bombs > 0) {
        setInner(bombs);
      }
    }
  }, [selected, flag]);

  useEffect(() => {
    if (gameOver && type === 'bomb') {
      setInner('💣');
      classes.push('Selected');
    }
    if (!gameOver) {
      setInner('');
    }
  }, [gameOver]);

  return (
    <div
      className={`${classes.join(' ')} ${color}`}
      onClick={leftClick}
      onContextMenu={rightClick}
      data-testid="Square"
    >
      {inner}
    </div>
  );
}
