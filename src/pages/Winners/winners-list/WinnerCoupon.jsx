import React, { useEffect, useState } from 'react';
import './WinnerCoupon.css';

import CouponsCardBg from '../../../_assets/images/CouponsCardBg.png';
import qrCode from '../../../_assets/images/qrCode.png';
import Logo from '../../../_assets/images/Logo.png';

export const WinnerCoupon = ({ firstName,WinningPrize,CouponNumber,CouponQRcode,CouponPurchasingDate }) => {
   const [user, setUser] = useState(null);
   const [coupon_detail, setCouponsDetail] = useState([]);
   useEffect(() => {
  }, []);
   return (
      <>
                     <div className="coupons-card">
                                          <img src={CouponsCardBg} alt="" width="100%" />
                                          <div className="header">
                                             <img src={Logo} alt="" />
                                          </div>
                                          <div className="EL-number">{CouponNumber}</div>
                                          <div className="EL-coupon">coupons No.</div>
                                          <div className="price">Prize</div>
                                          <div className="Trip-country" style={{fontSize:"14px",marginTop:"3px"}}>{WinningPrize}</div>
                                          {!CouponQRcode ?
                                             <div className="Qr">
                                                <img src={c.qrCode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                             </div>
                                             :
                                             null
                                          }
                              
                                          <div className="dottedLine"></div>
                                          <div className="purchase-date">Purchase On:</div>
                                          <div className="date" >{CouponPurchasingDate}</div>
                                          <div className="coupon-name">Name:</div>
                                          <div className="name" style={{textTransform:"capitalize"}}>{firstName}</div>
                                       </div>
         
      </>
   );
};
