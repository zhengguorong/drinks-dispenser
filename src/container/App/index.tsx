import React from 'react';
import Step from '../../component/steps';
import Chooser from '../../component/chooser';
import './index.scss';

function App() {
  return (
    <div className="app-container">
      <div className="machine">
        <div className="screen">
          <Step></Step>
          <Chooser
            items={[
              { url: require('../../image/tea.svg'), name: 'tea' },
              { url: require('../../image/coffee.svg'), name: 'coffe' },
            ]}
          ></Chooser>
        </div>
      </div>
    </div>
  );
}

export default App;
