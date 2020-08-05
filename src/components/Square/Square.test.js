import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from './Square';

function clickSquare() {
  return 8;
}

test('Click Square to get nearby bombs', async () => {
  const { getByTestId } = render(<Square type="bomb" check={clickSquare} />);

  const square = getByTestId('Square');
  fireEvent.click(square);

  expect(square.className).toBe('Square Gray');
  expect(square.innerHTML).toBe('8');
});

test('Square Contains Bomb', async () => {
  const { getByTestId } = render(<Square type="bomb" gameOver={true} />);

  const square = getByTestId('Square');

  expect(square.className).toBe('Square GameOver Selected Black');
  expect(square.innerHTML).toBe('💣');
});
