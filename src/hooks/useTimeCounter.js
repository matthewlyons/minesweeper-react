import { useState, useEffect, useContext } from 'react';

import { StoreContext } from '../context/StoreContext';

export default function useTimeCounter() {
  const { state } = useContext(StoreContext);
  const { lost, won, gameTime } = state;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [gameTime]);

  useEffect(() => {
    if (seconds >= 999) {
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    let interval = null;
    if (!won && !lost) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [won, lost, seconds]);

  return seconds;
}
