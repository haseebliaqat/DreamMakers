import React, { useEffect, useState } from 'react';
import './ActiveCouponsCard.css';

import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import qrCode from '../../_assets/images/qrCode.png';
import Logo from '../../_assets/images/Logo.png';
import { accountService, alertService } from '@/_services';

export const ActiveCouponsCardAdmin = ({ isWinners }) => {
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
      GetCoupons();
      //alert("uer");
  }, []);

         const GetCoupons =()=> {
            let obj1 = {
               "limit": 20,
               "offset": 0,
               "order": [["id", "DESC"]],
               "where":{"id":{"$gt":0},"accountId":localStorage.getItem("user_id"), 'status':'active' }
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
                                          {!isWinners ?
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
                            {/* <div className="coupons-card5">
            <img src={CouponsCardBg} alt="" width="100%" />
            <div className="header5">
               <img src={Logo} alt="" />
            </div>
            <div className="EL-number5">EL65656-5454545</div>
            <div className="EL-coupon5">coupons No. 12232323232</div>
            <div className="price5">Prize</div>
            <div className="Trip-country5">Maldives</div>
            <div className="Qr5">
                  <img src={qrCode} alt="QR" style={{ width: '100%' }} />
               </div>
            <div className="dottedLine5"></div>
            <div className="purchase-date5">Purchase On:</div>
            <div className="date5">12 September 2021</div>
            <div className="coupon-name5">Name:</div>
            <div className="name5" style={{textTransform:"capitalize"}}>Aqib Ali</div>
         </div> */}
         
      </>
   );
};
