import React from 'react';
import Steps from '../../component/steps';
import Chooser, { Menu } from '../../component/chooser';
import './index.scss';

type Props = {};

type State = {
  stepIndex: number;
  drinksType: Array<Menu>;
  drinksOption: Array<Menu>;
};

const steps = [{ name: '1' }, { name: '2' }, { name: '3' }];

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stepIndex: 0,
      drinksType: [
        { url: require('../../image/tea.svg'), name: 'tea', checked: false },
        {
          url: require('../../image/coffee.svg'),
          name: 'coffe',
          checked: false,
        },
      ],
      drinksOption: [
        { url: require('../../image/milk.svg'), name: 'milk', checked: false },
        {
          url: require('../../image/sugar.svg'),
          name: 'sugar',
          checked: false,
        },
      ],
    };
  }
  render() {
    return (
      <div className="app-container">
        <div className="machine">
          <div className="screen">
            <Steps curStep={this.state.stepIndex} steps={steps}></Steps>
            {this.stepContext()}
          </div>
        </div>
      </div>
    );
  }
  stepContext() {
    const { stepIndex } = this.state;
    switch (stepIndex) {
      case 0:
        return (
          <Chooser
            menus={this.state.drinksType}
            onChoose={(index: number) => this.onDrinksTypeChoose(index)}
          ></Chooser>
        );
      case 1:
        return (
          <Chooser
            menus={this.state.drinksOption}
            onChoose={(index: number) => this.onOptionsChoose(index)}
          ></Chooser>
        );
    }
  }
  onDrinksTypeChoose(index: number) {
    const { drinksType } = this.state;
    drinksType[index].checked = !drinksType[index].checked;
    this.setState({ drinksType});
    setTimeout(() => {
      this.setState({ stepIndex: 1 })
    }, 400);
  }
  onOptionsChoose(index: number) {
    const { drinksOption } = this.state;
    drinksOption[index].checked = !drinksOption[index].checked;
    this.setState({ drinksOption});
  }
}

export default App;
