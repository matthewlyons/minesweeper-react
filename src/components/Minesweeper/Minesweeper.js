import React from 'react';
import Board from '../Board';
import Controller from '../Controller';

export default function Minesweeper() {
  return (
    <div className="Minesweeper">
      <Controller />
      <Board />
    </div>
  );
}
