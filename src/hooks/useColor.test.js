import { renderHook } from '@testing-library/react-hooks';
import useColor from './useColor';

test('Returns correct color Blue with number 1', () => {
  const { result } = renderHook(() => useColor(1));
  expect(result.current).toBe('Blue');
});

test('Returns correct color Green with number 2', () => {
  const { result } = renderHook(() => useColor(2));
  expect(result.current).toBe('Green');
});

test('Returns correct color Red with number 3', () => {
  const { result } = renderHook(() => useColor(3));
  expect(result.current).toBe('Red');
});

test('Returns correct color Purple with number 4', () => {
  const { result } = renderHook(() => useColor(4));
  expect(result.current).toBe('Purple');
});

test('Returns correct color Maroon with number 5', () => {
  const { result } = renderHook(() => useColor(5));
  expect(result.current).toBe('Maroon');
});

test('Returns correct color Turquoise with number 6', () => {
  const { result } = renderHook(() => useColor(6));
  expect(result.current).toBe('Turquoise');
});

test('Returns correct color Black with number 7', () => {
  const { result } = renderHook(() => useColor(7));
  expect(result.current).toBe('Black');
});

test('Returns correct color Gray with number 8', () => {
  const { result } = renderHook(() => useColor(8));
  expect(result.current).toBe('Gray');
});
