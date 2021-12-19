import React, { useEffect, useState } from 'react';
import './ActiveCouponsCard.css';

import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import Logo from '../../_assets/images/Logo.png';
import { accountService, alertService } from '@/_services';

export const ActiveCouponsCardAdmin = (props) => {
   const [coupon_detail, setCouponsDetail] = useState([]);
   useEffect(() => {
      GetCoupons();
  }, [props.campaignId]);

  const GetCoupons =()=> {
      let obj1 = {
         "limit": 20,
         "offset": 0,
         "order": [["id", "DESC"]],
         "where":{"id":{"$gt":0},"campaignId":props.campaignId, 'status':'active' }
      }
         alertService.clear();
         accountService.ActiveCoupons(obj1).then((resp) => {
            setCouponsDetail(resp.rows)
         }).catch(error => {
            alertService.error("Internal Server Error");
         });
   }

   return (
      <>
                     {coupon_detail.map((c) => {
                                        return (
                                          <div className="coupons-card5">
                                          <img src={CouponsCardBg} alt="" width="100%" />
                                          <div className="header5">
                                             <img src={Logo} alt="" />
                                          </div>
                                          <div className="EL-number5">{c.qrCodes[1].code}</div>
                                          <div className="EL-coupon5">coupons No.</div>
                                          <div className="price5">Prize</div>
                                          <div className="Trip-country5">{c.campaign.prizeTitle}</div>
                                          {!props.isWinners ?
                                             <div className="Qr5">
                                                {
                                                   c.qrCodes[1].type == 'admin' ? <img src={c.qrCodes[1].url} alt="QR" style={{ width: '51%',backgroundColor:"white" }} /> : <div></div>
                                                }
                                               
                                             </div>
                                             :
                                             null
                                          }
                              
                                          <div className="dottedLine5"></div>
                                          <div className="purchase-date5">Purchase On:</div>
                                          <div className="date5">{c.created}</div>
                                          <div className="coupon-name5">Name:</div>
                                          <div className="name5">{c.account.firstName+" "+c.account.lastName}</div>
                                       </div>
                                        )

                                })
                            }
         
      </>
   );
};
