import React, { useEffect, useState } from 'react';
import './ActiveCouponsCard.css';

import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import qrCode from '../../_assets/images/qrCode.png';
import Logo from '../../_assets/images/Logo.png';

export const ActiveCouponsCard = ({ isWinners }) => {
   const [user, setUser] = useState(null);
   const [coupon_detail, setCouponsDetail] = useState([]);
   useEffect(() => {
      // let token =  getCookie("token");
      // setToken(token);
      //  const subscription = accountService.user.subscribe(x => setUser(x));
      //  console.log("user", user);
      //  return subscription.unsubscribe;
      //alert(localStorage.userDetails);
      if (!!localStorage.userDetails) {            
         setUser(JSON.parse(localStorage.userDetails));
         //console.log(user);
      }
      if (!!localStorage.purchase_detail) {            
         setCouponsDetail(JSON.parse(localStorage.purchase_detail));
         //console.log(user);
      }
      //alert("uer");
  }, []);
   return (
      <>
                     {/* {coupon_detail.map((c) => {
                                        return (
                                          <div className="coupons-card">
                                          <img src={CouponsCardBg} alt="" width="100%" />
                                          <div className="header">
                                             <img src={Logo} alt="" />
                                          </div>
                                          <div className="EL-number">{c.code}</div>
                                          <div className="EL-coupon">coupons No.</div>
                                          <div className="price">Prize</div>
                                          <div className="Trip-country">{c.campaign}</div>
                                          {!isWinners ?
                                             <div className="Qr">
                                                <img src={c.qrCode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                             </div>
                                             :
                                             null
                                          }
                              
                                          <div className="dottedLine"></div>
                                          <div className="purchase-date">Purchase On:</div>
                                          <div className="date">{c.purchaseDate}</div>
                                          <div className="coupon-name">Name:</div>
                                          <div className="name">{c.firstName+" "+c.lastName}</div>
                                       </div>
                                        )

                                })
                            } */}
                            <div className="coupons-card">
            <img src={CouponsCardBg} alt="" width="100%" />
            <div className="header">
               <img src={Logo} alt="" />
            </div>
            <div className="EL-number">EL65656-5454545</div>
            <div className="EL-coupon">coupons No. 12232323232</div>
            <div className="price">Prize</div>
            <div className="Trip-country">Maldives</div>
            <div className="Qr">
                  <img src={qrCode} alt="QR" style={{ width: '100%' }} />
               </div>
            <div className="dottedLine"></div>
            <div className="purchase-date">Purchase On:</div>
            <div className="date">12 September 2021</div>
            <div className="coupon-name">Name:</div>
            <div className="name" style={{textTransform:"capitalize"}}>Aqib Ali</div>
         </div>
         
      </>
   );
};
