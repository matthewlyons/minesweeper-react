import React from 'react';
import { render } from '@testing-library/react';
import NumberDisplay from './NumberDisplay';

test('1: add class of One', async () => {
  const { getByTestId } = render(<NumberDisplay num={'1'} />);

  const container = getByTestId('NumberDisplay');

  expect(container.firstChild.className).toBe('Foreground One');
  expect(container.firstChild.innerHTML).toBe('1');
});

test('Renders 8', async () => {
  const { getByTestId } = render(<NumberDisplay num={'8'} />);

  const container = getByTestId('NumberDisplay');

  expect(container.firstChild.className).toBe('Foreground');
  expect(container.firstChild.innerHTML).toBe('8');
});
