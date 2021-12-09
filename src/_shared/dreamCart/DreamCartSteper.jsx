import React, { useState,useEffect } from 'react';
import './dreamCart.less';

import BackArrow from '../../_assets/dreamCart/BackArrow.svg';
import DreamCartHeader from '../../_shared/dreamCart/DreamCartHeader';
import DreamCartHeaderBilling from '../../_shared/dreamCart/DreamCartHeaderBilling';
import DreamCartHeaderInformation from '../../_shared/dreamCart/DreamCartHeaderInformation';
import DreamCartHeaderPayemnt from '../../_shared/dreamCart/DreamCartHeaderPayemnt';
import DreamCartHeaderConformation from '../../_shared/dreamCart/DreamCartHeaderConformation';


const DreamCartSteper = (props) => {
   const [userID, setUserID] = useState(localStorage.getItem("user_id"));
 
   return (
      <>
         <div className="dreamCartHeading">
            <div className="d-flex">
               <button className="btn backArrowButton">
                  <img src={BackArrow} alt="backarrow" />
               </button>
               <div className="dreamCartTitle">Dream Cart{props.value}</div>
            </div>
            <div className="d-flex">
               <DreamCartHeaderBilling name="Billing"path="/dream-cart" value={props.value}  />
               <div className="DreamCart-Y-line"></div>
               {userID!=""?<div></div>: <DreamCartHeaderInformation name="Information" path="/dream-cart-information"   value={props.value} />}
               {userID!=""?<div></div>:<div className="DreamCart-Y-line"></div>}
               <DreamCartHeaderPayemnt name="Payment" path=""    value={props.value}/>
               <div className="DreamCart-Y-line"></div>
               <DreamCartHeaderConformation name="Conformation" path=""   value={props.value} />
            </div>
         </div>
      </>
   );
};

export default DreamCartSteper;
