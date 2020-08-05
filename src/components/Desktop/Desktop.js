import React from 'react';
import TaskBar from '../TaskBar';
import Window from '../Window';
import Minesweeper from '../Minesweeper';
import Programs from '../Programs';

export default function Desktop() {
  return (
    <div>
      <Programs
        programs={[
          { icon: 'recycle', title: 'Recycle Bin' },
          { icon: 'ie', title: 'Internet Explorer' },
          { icon: 'documents', title: 'My Documents' }
        ]}
      />
      <Window title="Minesweeper" icon="minesweeper-1.png">
        <Minesweeper />
      </Window>
      <TaskBar />
    </div>
  );
}
