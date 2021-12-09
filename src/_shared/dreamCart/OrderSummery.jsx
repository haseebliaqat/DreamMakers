import React from 'react';
import './dreamCart.less';

import Basket from '../../_assets/dreamCart/Basket.svg';
import DownErrow from '../../_assets/dreamCart/DownErrow.svg';
import Card from './Card';

const OrderSummery = () => {
   return (
      <div className="show-card-hover">
         <div className="OrderSummer-container">
            <div className="OrderSummery">
               <img src={Basket} alt="Basket" />
               <span>Show Order Summery</span>
            </div>
            <div className="dropErrow">
               <img src={DownErrow} alt="DownErrow" />
            </div>
         </div>
         <div className="card-display-on-hover boxShadow">
            <Card />
         </div>
      </div>
   );
};

export default OrderSummery;
