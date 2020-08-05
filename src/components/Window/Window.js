import React from 'react';
import WindowsHeader from '../WindowHeader';
import Draggable from 'react-draggable';

export default function Window(props) {
  let { title, icon, children } = props;
  return (
    <Draggable handle=".Header">
      <div className="Window">
        <WindowsHeader title={title} icon={icon} />
        <div className="WindowContainer">{children}</div>
      </div>
    </Draggable>
  );
}
