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
                     <div className="coupons-card7">
                                          <img src={CouponsCardBg} alt="" width="100%" />
                                          <div className="header7">
                                             <img src={Logo} alt="" />
                                          </div>
                                          <div className="EL-number7">{CouponNumber}</div>
                                          <div className="EL-coupon7">coupons No.</div>
                                          <div className="price7">Prize</div>
                                          <div className="Trip-country7" style={{fontSize:"14px",marginTop:"3px"}}>{WinningPrize}</div>
                                          {!CouponQRcode ?
                                             <div className="Qr7">
                                                <img src={CouponQRcode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                             </div>
                                             :
                                             null
                                          }
                              
                                          <div className="dottedLine7"></div>
                                          <div className="purchase-date7">Purchase On:</div>
                                          <div className="date7" >{CouponPurchasingDate}</div>
                                          <div className="coupon-name7">Name:</div>
                                          <div className="name7" style={{textTransform:"capitalize"}}>{firstName}</div>
                                       </div>
         
      </>
   );
};
