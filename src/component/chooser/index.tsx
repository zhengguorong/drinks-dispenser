import React from 'react';
import './index.scss';
import { Product } from '../../store/dispenser/types'

type Props = {
  products: Product[];
  isShowOkBtn?: boolean;
  onChoose: Function;
  onOK?: Function;
};

function Chooser(props: Props) {
  return (
    <div className="container">
      <div className="menus">
        {props.products.map((product: Product) => {
          return (
            <div
              className={`menu ${product.checked ? 'active' : ''}`}
              onClick={() => {
                props.onChoose(product.name);
              }}
              key={product.name}
            >
              <img src={product.url} alt={product.name} />
              <div>{product.name}</div>
            </div>
          );
        })}
      </div>
      { props.isShowOkBtn && <div className="ok" onClick={() => props.onOK && props.onOK()}>OK</div>}
    </div>
  );
}

export default Chooser;
