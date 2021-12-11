import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import { winnersService } from '@/_services/winners.service';

import LiveDraw from '../../_assets/images/live_draw.jpg';
import Logo from '../../_assets/images/Logo.png';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
const divStyle = {
  height: '667px',
  backgroundImage: `url(${LiveDraw})`,
  backgroundSize: 'cover',
};
const divStyle2 = {
    width: "150px",
    height: "150px",
    backgroundSize: 'cover',
    borderRadius:"50%",
    marginTop:"50px",
    backgroundColor:"#0e1a46"
  };

  const divStyle3 = {
    boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",transition: "0.3s",width:"75%",
    backgroundColor:"white",borderRadius:"10px",
  };
 function  SelectedCampaignListView() {
    const history = useHistory();
    const [CodeValue, setCodeValue] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [winners, setWinners] = useState([]);
    const [allCampaignExpired, setAllCampaignExpired] = useState(false);
    useEffect(() => {
        let obj = {
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": {"id": {'$in' : localStorage.getItem('Selected_go_live_campaigns')} }
        }
        campaignsService.getAll(obj).then((x) => {
            let allExpired = x.rows.every((i) => {
                return i.status === 'expired'
            })
            setAllCampaignExpired(allExpired);
            setTotalCount(x.count)
            setCampaigns(x.rows)
            if(allExpired){
                let obj = {
                    "offset": 0,
                    "order": [["id", "ASC"]],
                    "where": {"campaignId": {'$in' : localStorage.getItem('Selected_go_live_campaigns')} }
                }
                winnersService.getAll(obj).then((x) => {
                    setWinners(x.rows);
                });
            }
        });

        
    }, []);
    const LetsGo=(campId)=>{
        localStorage.setItem('Selected_go_live_campaigns_current_campaignId',campId);
        history.push('/LiveVideo');
    }
    return (
        <div className="Component" style={divStyle} >
            <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0"}}>
                <div id="avatar" style={divStyle2}><img src={Logo} style={{marginTop:"46px",marginLeft:"28px"}} /></div>
            </div>
            <div  style={{display:"flex", justifyContent:"center", width:"100%", padding:"0"}}>
            <h3 style={{fontSize:"30px",fontWeight:"800px",color:"rgb(14 26 70)",paddingTop:"7px",fontWeight:'900'}}>Live Draw</h3>
            </div>
            {
                !allCampaignExpired ?
             campaigns.map((item) => (
                                <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"25px"}}>
                                    <div style={divStyle3} >
                                    <p style={{padding:"8px",fontSize:"10px",color:"black"}}>#{item.id}</p>
                                    <div style={{display:"flex"}}>
                                    <p style={{padding:"px",fontSize:"20px",color:"#0e1a46",marginTop:"-20px",paddingLeft:"8px",fontWeight:"900",textTransform:"capitalize"}}>{item.title} ({item.soldCoupons} Entries)</p>
                                        <div style={{display:"block",marginLeft:"auto",marginRight:"14px",marginTop:"-26px"}}>   <button  className={`${item.status == 'expired' ? "let-go-expired" : "let-go"}`} onClick={LetsGo(item.id)} disabled={item.status == 'expired'}>Let's Go!</button></div>
                                    </div>
                                    </div> 
                                </div>
					)): 
                    
                    winners.map((item) => (
                        <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"25px"}}>
                            <div style={divStyle3} >
                            <p style={{padding:"8px",fontSize:"10px",color:"black"}}>#{item.id}</p>
                            <div style={{display:"flex"}}>
                            <p style={{padding:"px",fontSize:"20px",color:"#0e1a46",marginTop:"-20px",paddingLeft:"8px",fontWeight:"900",textTransform:"capitalize"}}>{item.title} ({item.soldCoupons} Entries)</p>
                                <div style={{display:"block",marginLeft:"auto",marginRight:"14px",marginTop:"-26px"}}>   <button  className={`${item.status == 'expired' ? "let-go-expired" : "let-go"}`} onClick={LetsGo} disabled={item.status == 'expired'}>Let's Go!</button></div>
                            </div>
                            </div> 
                        </div>
                    ))
            }
        </div>
    );
}
export { SelectedCampaignListView };