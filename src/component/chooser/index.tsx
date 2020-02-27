import React from 'react';
import './index.scss';

function Chooser(props: any) {
  return (
    <div className="container">
      {props.items.map((item: any) => {
        return (
          <div className="item active">
          <img src={item.url} alt={item.name}/>
          <div>{item.name}</div>
        </div>
        )
      })}
  </div>
  );
}

export default Chooser;
