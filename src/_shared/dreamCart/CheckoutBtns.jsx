import React, { useState } from 'react';
import './dreamCart.less';

const CheckoutBtns = (props) => {
   return (
      <div>
         <button
            onClick={props.toggler}
            className={`btn form-control my-1 buttonRound ${props.paddings} ${props.textCenter}`}
            style={{
               backgroundColor: props.backgroundColor,
               color: props.color,
               border: props.border,
            }}
         >
            {props.img && (
               <img
                  src={props.img}
                  alt=""
                  height={24}
                  className="absoluteClass U-paddingLeftText"
               />
            )}
            <span className="FloarRight-Responsive">{props.text}</span>
         </button>
      </div>
   );
};

export default CheckoutBtns;
