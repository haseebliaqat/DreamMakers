import React, { useState,useEffect } from 'react';

import Card from '../../_shared/dreamCart/Card';
import CardBottom from '../../_shared/dreamCart/CardBottom';
import TermsCondition from '../../_shared/dreamCart/TermsCondition';
import DreamCartBanners from '../../_shared/dreamCart/DreamCartBanners';
import DreamCartSteper from '../../_shared/dreamCart/DreamCartSteper';
import { NewsLetter } from '../../_shared/newsletter/newsletter';
import { Link } from 'react-router-dom';

// mport "./dreamCart.less";
const DreamCart = (history, location,props) => {
   const [checkoutAsGuest, setCheckoutAsGuest] = useState('guest');
   const [itemID, setitemID] = useState('id');
   
   const [count, setCount] = useState(1);
   const [stepNo, setstepNo] = useState(1);
   useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
   return (
      <div>
         <DreamCartSteper value={stepNo}  />
         <Card count={count} setCount={setCount}/>
         <div className="container containerMedium">
            <div className="row">
               <div className="col-md-8 reverseOrder">
               <div/>
                  <TermsCondition
                     checkoutAsGuest={checkoutAsGuest}
                     onRadioChange={(value) => {
                        setCheckoutAsGuest(value);
                     }}
                  />
                  <DreamCartBanners />
               </div>
               <div className="col-md-4 U-marginX-25">
                  <CardBottom  count={count} setstepNo={setstepNo}
                     checkoutAsGuest={checkoutAsGuest === 'notGuest' }
                  />
               </div>
               <div className="col-12 d-md-block d-none">
                  <NewsLetter />
               </div>
            </div>
         </div>
      </div>
   );
};

export default DreamCart;
