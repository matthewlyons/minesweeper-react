import React, { useEffect, useState, useContext } from 'react';

import useTimeCounter from '../../hooks/useTimeCounter';
import useFlagCounter from '../../hooks/useFlagCounter';

// Context
import { StoreContext } from '../../context/StoreContext';
import Ticker from '../Ticker';

export default function Controller() {
  const { state, newGame } = useContext(StoreContext);

  const { lost, won, gameBoard } = state;

  const [emoji, setEmoji] = useState('😁');

  const handleMouseDown = (e) => {
    if (lost || won) {
      return;
    }
    if (e.srcElement.className.includes('Square')) {
      setEmoji('😮');
    }
  };

  const handleMouseUp = (e) => {
    if (lost || won) {
      return;
    }
    if (e.srcElement.className.includes('Square')) {
      setEmoji('🙂');
    }
  };

  useEffect(() => {}, [gameBoard]);

  useEffect(() => {
    if (lost) {
      setEmoji('☹️');
    } else if (won) {
      setEmoji('😁');
    } else {
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      setEmoji('🙂');
    }
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [lost, won]);

  return (
    <div className="GameHeader">
      <Ticker value={useFlagCounter()} />
      <div className="Spacer">
        <div className="Emoji" onClick={newGame}>
          <span role="img" aria-label="smiley">
            {emoji}
          </span>
        </div>
      </div>
      <Ticker value={useTimeCounter()} />
    </div>
  );
}
