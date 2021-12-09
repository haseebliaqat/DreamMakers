import React, { useEffect, useState } from 'react';
import './CouponVerification.css';
import { Link } from 'react-router-dom';
import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import qrCode from '../../_assets/images/qrCode.png';
import Logo from '../../_assets/images/Logo.png';
import { useHistory } from "react-router-dom";
export const CouponVerification = ({}) => {
   const [user, setUser] = useState(null);
   const [coupon_detail, setCouponsDetail] = useState([]);
   const history = useHistory();
   useEffect(() => {
  }, []);
  const GoLive=()=>{
    history.push('/LiveVideo');

    
 }
 const Recheck=()=>{
    
 }
   return (
      <>
      <div>
            <div style={{textAlign:"center"}} className="pin">
                            <div className="coupons-card">
                                          <img src={CouponsCardBg} alt="" width="100%" />
                                          <div className="header1">
                                             <img src={Logo} alt="" />
                                          </div>
                                          <div className="EL-number">EL-0094-4444</div>
                                          <div className="EL-coupon1">coupons No.</div>
                                          <div className="price">Prize</div>
                                          <div className="Trip-country" style={{fontSize:"14px",marginTop:"3px"}}>Trip to Maldive</div>
                                          {/* {!CouponQRcode ?
                                             <div className="Qr">
                                                <img src={qrCode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                             </div>
                                             :
                                             null
                                          } */}
                                            <div className="Qr1">
                                                <img src={qrCode} alt="QR" style={{ width: '100%',backgroundColor:"white" }} />
                                             </div>
                                          <div className="dottedLine"></div>
                                          <div className="purchase-date">Purchase On:</div>
                                          <div className="date" >6 September 2021</div>
                                          <div className="coupon-name">Name:</div>
                                          <div className="name">Aqib Ali</div>
                                       </div>
                                       <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"130px"}} >
                                            {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
                                         <p><Link><button  className="live-draw" onClick={GoLive}>Push to Live</button></Link></p>
                                         </div>
                                        <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"13px"}} >
                                            {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
                                            <p><Link><button  className="live-draw" onClick={Recheck}>Recheck</button></Link></p>
                                        </div>
                </div>
        </div>
                     
         
      </>
   );
};
