import React from 'react';
import './index.scss';

type Props = {
  curStep: number;
  steps: Array<Step>;
};

type Step = {
  name: string;
};
function Steps(props: Props) {
  return (
    <div className="steps">
      {props.steps.map((step, index) => {
        return (
          <div className={`step ${props.curStep >= index ? 'active': ''}`} key={index}>
            <div className="num">{step.name}</div>
          </div>
        );
      })}
      </div>
  );
}

export default Steps;
