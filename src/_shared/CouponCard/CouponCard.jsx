import React, { useEffect, useState } from 'react';
import './CouponCard.css';

import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import qrCode from '../../_assets/images/qrCode.png';
import Logo from '../../_assets/images/Logo.png';

export const CouponCard = ({ isWinners }) => {
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
                     {coupon_detail.map((c) => {
                                        return (
                                          <div className="coupons-card4">
                                          <img src={CouponsCardBg} alt="" width="100%" />
                                          <div className="header4">
                                             <img src={Logo} alt="" />
                                          </div>
                                          <div className="EL-number4">{c.code}</div>
                                          <div className="EL-coupon4">coupons No.</div>
                                          <div className="price4">Prize</div>
                                          <div className="Trip-country4">{c.campaign}</div>
                                          {!isWinners ?
                                             <div className="Qr4">
                                                <img src={c.qrCode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                             </div>
                                             :
                                             null
                                          }
                              
                                          <div className="dottedLine4"></div>
                                          <div className="purchase-date4">Purchase On:</div>
                                          <div className="date4">{c.purchaseDate}</div>
                                          <div className="coupon-name4">Name:</div>
                                          <div className="name4" style={{textTransform:"capitalize"}}>{c.firstName+" "+c.lastName}</div>
                                       </div>
                                        )

                                })
                            }
         
      </>
   );
};
