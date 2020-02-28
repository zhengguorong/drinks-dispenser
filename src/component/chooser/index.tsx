import React from 'react';
import './index.scss';

type Props = {
  menus: Array<Menu>;
  onChoose: Function;
};

export type Menu = {
  url: string;
  name: string;
  checked: boolean;
};

function Chooser(props: Props) {
  return (
    <div className="container">
      {props.menus.map((menu: Menu, index: number) => {
        return (
          <div
            className={`menu ${menu.checked ? 'active': ''}`}
            onClick={() => {
              props.onChoose(index);
            }}
            key={menu.name}
          >
            <img src={menu.url} alt={menu.name} />
            <div>{menu.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Chooser;
