import React from 'react';
import { render } from '@testing-library/react';
import Ticker from './Ticker';

test('Renders 000', async () => {
  const value = Number('000');
  const { getByTestId } = render(<Ticker value={value} />);

  const container = getByTestId('Ticker');

  expect(container.firstChild.firstChild.innerHTML).toBe('0');
});

test('Renders 900', async () => {
  const value = Number('900');
  const { getByTestId } = render(<Ticker value={value} />);

  const container = getByTestId('Ticker');

  expect(container.firstChild.firstChild.innerHTML).toBe('9');
});
