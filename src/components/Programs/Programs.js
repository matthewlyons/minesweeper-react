import React from 'react';

export default function Programs(props) {
  let { programs } = props;
  return (
    <div className="Programs">
      {programs.map((program) => {
        return (
          <div className="Program">
            <img
              src={process.env.PUBLIC_URL + '/img/' + program.icon + '.png'}
              alt="Program"
            />
            <p>{program.title}</p>
          </div>
        );
      })}
    </div>
  );
}
