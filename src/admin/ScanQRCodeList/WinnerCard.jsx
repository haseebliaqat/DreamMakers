import React, { useEffect, useState } from "react";
import { campaignsService } from '@/_services/campaigns.service';
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
    const [CodeValue, setCodeValue] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    useEffect(() => {
        let obj = {
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": {"id": 7 }
        }
        campaignsService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setCampaigns(x.rows)
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

            <div className="Winner-Card">
                <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-54px"}}>
                     <img src={winner_title} className="Winner-title" />
                   
                </div>
                <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"50px"}}>
                         <img src="http://i.stack.imgur.com/Dj7eP.jpg" className="Winner-Profile" />
                </div>
                <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"13px"}}>
                    <p className="heading">Aqib Ali</p>
                </div>
                <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-7px"}}>
                    <p className="heading">Dubai</p>
                </div>
                <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-4px"}}>
                    <p className="heading">2 Months MALDIVES TRIP</p>
                </div>
                    <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"-6px",marginLeft:"43px"}}>
                            <div className="coupons-card2">
                            <img src={CouponsCardBg} alt="" width="80%" />
                                <div className="header2">
                                    <img src={Logo} alt="" />
                                </div>
                                <div className="EL-number2">EL-0094-4444</div>
                                <div className="EL-coupon2">coupons No.</div>
                                <div className="price2">Prize</div>
                                <div className="Trip-country2" style={{fontSize:"14px",marginTop:"3px"}}>Trip to Maldive</div>
                                            {/* {!CouponQRcode ?
                                                <div className="Qr">
                                                    <img src={qrCode} alt="QR" style={{ width: '51%',backgroundColor:"white" }} />
                                                </div>
                                                :
                                                null
                                            } */}
                                <div className="Qr2">
                                    <img src={qrCode} alt="QR2" style={{ width: '83%',backgroundColor:"white" }} />
                                </div>
                                <div className="dottedLine2"></div>
                                <div className="purchase-date2">Purchase On:</div>
                                <div className="date2" >6 September 2021</div>
                                <div className="coupon-name2">Name:</div>
                                <div className="name2" style={{textTransform:"capitalize"}}>Aqib Ali</div>
                        </div>
                    </div>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end", width:"100%", padding:"0",marginLeft:"-13px"}}>
                <div style={divStyle3}>
                <p><Link><button  className="next-Draw" onClick={LetsGo}>Next Draw</button></Link></p>
                </div>
            </div>
        </div>
    );
}
export { WinnerCard };