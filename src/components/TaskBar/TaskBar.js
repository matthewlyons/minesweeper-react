import React, { useEffect, useState } from 'react';

export default function TaskBar() {
  const [time, setTime] = useState({ hour: 1, minutes: 0, period: 'AM' });

  useEffect(() => {
    const interval = setInterval(() => {
      let d = new Date();
      let h = d.getHours();
      let minutes = d.getMinutes();
      let hour = h > 12 ? h - 12 : h;
      let period = h > 12 ? 'PM' : 'AM';
      setTime({ hour, minutes, period });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="TaskBar">
      <div className="Bar">
        <div className="Start">
          <img
            src={process.env.PUBLIC_URL + '/img/start-button.png'}
            alt="Start Button"
          />
        </div>
        <div className="Divider"></div>
        <div className="OpenPrograms">
          <div className="Program">
            <img
              src={process.env.PUBLIC_URL + '/img/minesweeper-1.png'}
              className="ProgramIcon"
              alt="Icon"
            />
            <p>Minesweeper</p>
          </div>
        </div>
        <div className="Time">
          <p>
            {time.hour}:{time.minutes} {time.period}
          </p>
        </div>
      </div>
    </div>
  );
}
