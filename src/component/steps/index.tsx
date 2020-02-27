import React from 'react';
import './index.scss';

function Steps() {
  return (
      <div className="steps">
        <div className="step active">
          <div className="num">1</div>
        </div>
        <div className="step">
          <div className="num">2</div>
        </div>
        <div className="step">
          <div className="num">3</div>
        </div>
      </div>
  );
}

export default Steps;
