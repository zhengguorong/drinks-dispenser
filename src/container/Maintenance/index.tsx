import React from 'react';
import StockChart from '../../component/StockChart/index.js';
import TemperatureChart from '../../component/TemperatureChart/index.js';
import './index.scss';

type Props = {
  history: any
};

type State = {
  isStockChart: boolean;
};

class Maintenance extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isStockChart: true,
    };
  }
  render() {
    return (
      <div className="container">
        <img
          className="back"
          onClick={() => this.goBack()}
          src={require('../../image/back.svg')}
          alt=""
        />
        <img
          className="toggle"
          onClick={() => this.toggleChart()}
          src={require('../../image/toggle.svg')}
          alt=""
        />
        {this.state.isStockChart ? <StockChart /> : <TemperatureChart />}
      </div>
    );
  }
  toggleChart() {
    this.setState({ isStockChart: !this.state.isStockChart });
  }
  goBack() {
    this.props.history.goBack();
  }
}

export default Maintenance;
