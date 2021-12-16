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
            let temp = {
                "winner": {
                    "winningDate": "2021-12-16T23:12:22.209Z",
                    "created": "2021-12-16T23:12:22.209Z",
                    "id": 22,
                    "fullName": "Muhammad Ahsan",
                    "designation": "NA",
                    "comments": "NA",
                    "country": "NA",
                    "picUrl": "https://dreammakersbucket.s3-ap-southeast-1.amazonaws.com/pictures/14-vector-artwork.jpg",
                    "videoUrl": "",
                    "qrCodeUrl": "https://dreammakersbucket.s3.ap-southeast-1.amazonaws.com/pictures/833491161016396744246793137462998.png",
                    "couponNumber": "CH-00033-00413",
                    "couponPurchaseDate": "2021-12-16T17:07:04.000Z",
                    "campaignTitle": "WIN 120,000 AED Worth of GOLD",
                    "winningPrizeTitle": "Congratulation",
                    "campaignId": 33,
                    "couponId": 413,
                    "accountId": 99
                },
                "account": {
                    "isVerified": true,
                    "id": 99,
                    "email": "mabane5247@gruppies.com",
                    "title": "Mr",
                    "firstName": "Muhammad",
                    "lastName": "Ahsan",
                    "acceptTerms": true,
                    "role": "User",
                    "verificationToken": "beb0d183a3ea726e071d49e513649c0d2d29c97a627d0e9bdad9e0596bc5c926cbfed41003333a22",
                    "verified": "2021-12-11T12:49:24.000Z",
                    "resetToken": null,
                    "resetTokenExpires": null,
                    "passwordReset": null,
                    "picUrl": "https://dreammakersbucket.s3-ap-southeast-1.amazonaws.com/pictures/14-vector-artwork.jpg",
                    "mobileNumber": "+971589326491",
                    "nationality": "Pakistani",
                    "countryResidence": "United Arab Emirates",
                    "city": "New York",
                    "address": "",
                    "created": "2021-12-11T12:49:24.000Z",
                    "updated": "2021-12-11T12:53:20.000Z"
                },
                "coupon": {
                    "id": 413,
                    "code": "83376163967442466872436",
                    "status": "expired",
                    "created": "2021-12-16T17:07:04.000Z",
                    "updated": null,
                    "accountId": 99,
                    "campaignId": 33,
                    "purchaseId": 217
                },
                "qrCode": {
                    "id": 826,
                    "code": "CH-00033-00413",
                    "hash": "42924163967442467987109",
                    "type": "admin",
                    "url": "https://dreammakersbucket.s3.ap-southeast-1.amazonaws.com/pictures/385014292416396744246798710967757.png",
                    "status": "expired",
                    "created": "2021-12-16T17:07:04.000Z",
                    "updated": null,
                    "couponId": 413,
                    "campaignId": 33,
                    "purchaseId": 217
                }
            }
            setWinners(temp.winner);
            //setWinners(winner.winner)
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