import React from 'react';

import logo from '@/_assets/dreamCart/logo.png';
import Picture10 from '@/_assets/dreamCart/picture10.png';
import './dreamCart.less';
import paymentOpt from '../../_assets/images/payment-opts.png';

const DreamCartBanners = () => {
   return (
      <div style={{marginTop:"-31px"}}>
         <div className="d-flex justify-content-between align-items-center dreamBanner px-4 py-2">
            <div className="bannerCart-text">Regulated by dubai economy</div>
            <div className="bannerLogo">
               <img src={logo} alt="Dubai logo" width="100%" />
            </div>
         </div>
         <div className="d-flex justify-content-between align-items-center dreamBanner p-0 pl-4 my-2">
            <div className="bannerCart-text" style={{ lineHeight: '1.3' }}>
               safe & secure <br />
               payment methods
            </div>
            <div className="bannerLogo">
               <img src={paymentOpt} alt="cards" width="100%" />
            </div>
         </div>
      </div>
   );
};

export default DreamCartBanners;
