import React from 'react';
import StockChart from '../../component/StockChart/index.js';
import TemperatureChart from '../../component/TemperatureChart/index.js';
import { DispenserState } from '../../store/dispenser/types';
import { connect, ConnectedProps } from 'react-redux';
import temperatureAPI from '../../api/temperature';
import './index.scss';

interface State {
  isStockChart: boolean;
  temps: any;
};
interface RootState {
  dispenser: DispenserState
}
const mapState = (state: RootState) => ({
  products: state.dispenser.products
})
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  history: any
}

class Maintenance extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isStockChart: true,
      temps: []
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
        {this.state.isStockChart ? <StockChart products={this.props.products}/> : <TemperatureChart temps={this.state.temps} />}
      </div>
    );
  }
  async componentDidMount() {
    const res = await temperatureAPI.getTemperature('123');
    this.setState({ temps: res.temps })
  }
  toggleChart() {
    this.setState({ isStockChart: !this.state.isStockChart });
  }
  goBack() {
    this.props.history.goBack();
  }
}

export default connector(Maintenance);
