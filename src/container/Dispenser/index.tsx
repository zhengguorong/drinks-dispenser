import React from 'react';
import Steps from '../../component/Steps';
import Chooser from '../../component/Chooser';
import temperatureAPI from '../../api/temperature';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { DispenserState } from '../../store/dispenser/types';
import './index.scss';
import { changeProductStatus, updateProductStock, initProductStatus } from '../../store/dispenser/actions';

interface RootState {
  dispenser: DispenserState
}

const mapState = (state: RootState) => ({
  stepIndex: 0,
  drinksType: state.dispenser.products.filter(
    (product) => product.name === 'tea' || product.name === 'coffee'
  ),
  drinksOption: state.dispenser.products.filter(
    (product) => product.name === 'milk' || product.name === 'sugar'
  ),
  makeStatus: 'ready',
})

const mapDispatch = {
  changeProductStatus,
  updateProductStock,
  initProductStatus
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const steps = [{ name: '1' }, { name: '2' }, { name: '3' }];

class Dispenser extends React.Component<Props> {
  render() {
    return (
      <div>
        <Steps curStep={this.props.stepIndex} steps={steps}></Steps>
        {this.stepContext()}
        <Link to="/maintenance" className="setting">
          <img src={require('../../image/maintenance.svg')} alt="" />
        </Link>
      </div>
    );
  }
  componentDidMount() {
    this.reportTemperature();
  }
  stepContext() {
    const { stepIndex, makeStatus, drinksType, drinksOption } = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <Chooser
            products={drinksType}
            onChoose={(name: string) => this.onDrinksTypeChoose(name)}
          ></Chooser>
        );
      case 1:
        return (
          <Chooser
            products={drinksOption}
            onChoose={(name: string) => this.props.changeProductStatus(name)}
            onOK={() => this.onOptionsOK()}
            isShowOkBtn={true}
          ></Chooser>
        );
      case 2:
        return (
          <div className="making">
            <div>{makeStatus}</div>
            {makeStatus === 'finished' && (
              <div onClick={() => this.initDispenser()} className="back">
                back
              </div>
            )}
          </div>
        );
    }
  }
  onDrinksTypeChoose(name: string) {
    this.props.changeProductStatus(name);
    this.updateStock()
    setTimeout(() => {
      this.setState({ stepIndex: 1 });
    }, 400);
  }
  onOptionsOK() {
    this.makeDrinks();
    this.updateStock();
  }
  makeDrinks() {
    this.setState({ stepIndex: 2, makeStatus: 'making...' });
    setTimeout(() => {
      this.setState({ makeStatus: 'finished' });
    }, 2000);
  }
  updateStock() {
    const { drinksOption, drinksType } = this.props;
    this.props.updateProductStock([...drinksOption, ...drinksType]);
  }
  initDispenser() {
    this.props.initProductStatus();
  }
  reportTemperature() {
    const interval = setInterval(() => {
      const curTemperature = Math.floor(Math.random() * 1000) / 10;
      temperatureAPI.updateTemperature('123', curTemperature);
    }, 1 * 1000);
    return interval;
  }
}

export default connector(Dispenser);
