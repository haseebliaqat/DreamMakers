import React, { useEffect, useState } from "react";
import { campaignsService } from '@/_services/campaigns.service';
import { winnersService } from '@/_services/winners.service';
import LiveDraw from '../../_assets/images/Winner_bg.jpeg';
import Logo from '../../_assets/images/Logo.png';
import OtpInput from 'react-otp-input';
import Congrates from '../../_assets/images/congrates.png';
import winner_title from '../../_assets/images/winner_title.png';
import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import './WinnerCard.css';
import qrCode from '../../_assets/images/qrCode.png';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as moment from "moment";

const divStyle = {
  height: '667px',
  backgroundImage: `url(${LiveDraw})`,
  backgroundSize: 'cover',
};
const divStyle2 = {
    width: "70px",
    height: "70px",
    backgroundSize: 'cover',
    borderRadius:"50%",
    marginTop:"4px",
    backgroundColor:"#0e1a46"
  };

  const divStyle3 = {
    marginTop:"-9px",
  };

 
 function  WinnerCard() {
    const history = useHistory();
    const [Winners,setWinners] = useState([]);
    const [WinnersCode,setWinnersQrCode] = useState([]);
    useEffect(() => {
        let code = localStorage.getItem("currentWinnerCode");
        console.log(code);
        let obj = {
            "code": code
        }
        winnersService.scanWinner(obj).then((winner) => {
            console.log(winner);
            setWinners(winner.winner)
        });


    }, []);
    const LetsGo=()=>{
        history.push('/SeletedCampaignListView');
    }
    return (
        <div className="Component" style={divStyle} >
            <div style={{display:"flex", justifyContent:"flex-start", width:"100%", padding:"0",marginLeft:"10px"}}>
                <div id="avatar" style={divStyle2}><img src={Logo} style={{marginTop:"14px",marginLeft:"-2px",height:"28px"}} /></div>
            </div>
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-54px"}}>
            <img src={Congrates} style={{height:"144px"}}/>
            </div>

            { Winners ?
            <div className="Winner-Card">
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-54px"}}>
                 <img src={winner_title} className="Winner-title" />
               
            </div>
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"50px"}}>
                     <img src={Winners.picUrl} className="Winner-Profile" />
            </div>
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"13px"}}>
                <p className="heading">{Winners.fullName}</p>
            </div>
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-7px"}}>
                <p className="heading">{Winners.country}</p>
            </div>
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-4px"}}>
                <p className="heading">{Winners.winningPrizeTitle}</p>
            </div>
                <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-6px",marginLeft:"43px"}}>
                        <div className="coupons-card2">
                        <img src={CouponsCardBg} alt="" width="80%" />
                            <div className="header2">
                                <img src={Logo} alt="" />
                            </div>
                            <div className="EL-number2">{Winners.couponNumber}</div>
                            <div className="EL-coupon2">Coupon No.</div>
                            <div className="price2">Prize</div>
                            <div className="Trip-country2" style={{fontSize:"14px",marginTop:"3px"}}>{Winners.winningPrizeTitle}</div>
                                        {/* {!CouponQRcode ?
                                            <div className="Qr">
                                                <img src={qrCode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                            </div>
                                            :
                                            null
                                        } */}
                            <div className="Qr2">
                                <img src={Winners.qrCodeUrl} alt="QR2" style={{ width: '50%',backgroundColor:"white" }} />
                            </div>
                            <div className="dottedLine2"></div>
                            <div className="purchase-date2">Purchase On:</div>
                            <div className="date2" >{moment(Winners.couponPurchaseDate).format("MMM DD, YYYY  HH:MM")}</div>
                            <div className="coupon-name2">Name:</div>
                            <div className="name2" style={{textTransform:"capitalize"}}>{Winners.fullName}</div>
                    </div>
                </div>
        </div>:null
            }
            
            <div style={{display:"flex", justifyContent:"flex-end", width:"100%", padding:"0",marginLeft:"-13px"}}>
                <div style={divStyle3}>
                <p><Link><button  className="next-Draw" onClick={LetsGo}>Next Draw</button></Link></p>
                </div>
            </div>
        </div>
    );
}
export { WinnerCard };