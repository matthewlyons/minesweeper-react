import React from 'react';

export default function NumberDisplay(props) {
  let { num } = props;

  return (
    <div className="NumberDisplay" data-testid="NumberDisplay">
      <p className={'Foreground' + (num === '1' ? ' One' : '')}>{num}</p>
      <p className="Background">8</p>
    </div>
  );
}
