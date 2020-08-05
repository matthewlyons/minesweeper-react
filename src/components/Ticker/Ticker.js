import React, { useState, useEffect } from 'react';
import NumberDisplay from '../NumberDisplay';

export default function Ticker(props) {
  let { value } = props;

  const [numbers, setNumbers] = useState([0, 0, 0]);

  useEffect(() => {
    let data;
    if (value < 0) {
      data = Math.abs(value).toString().padStart(2, '0');
    } else {
      data = value.toString().padStart(3, '0');
    }

    let dataArray = data.split('');
    setNumbers(dataArray);
  }, [value]);

  return (
    <div className="Ticker" data-testid="Ticker">
      <NumberDisplay num={numbers[0]} />
      <NumberDisplay num={numbers[1]} />
      <NumberDisplay num={numbers[2]} />
    </div>
  );
}
