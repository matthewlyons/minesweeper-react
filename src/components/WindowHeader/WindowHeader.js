import React from 'react';

export default function WindowHeader(props) {
  let { title, icon } = props;
  return (
    <div className="Header">
      <img src={process.env.PUBLIC_URL + '/img/' + icon} alt="Icon" />
      <span style={{ flex: 1 }}>{title}</span>
      <div class="closeButton">
        <img
          src={process.env.PUBLIC_URL + '/img/close-icon.png'}
          alt="Close Button"
        />
      </div>
    </div>
  );
}
