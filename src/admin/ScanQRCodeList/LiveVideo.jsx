import React, { useEffect, useState } from "react";
import QrReader from 'react-qr-scanner'
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import { ActiveCouponsCardAdmin } from '@/pages/ActiveCoupons/ActiveCouponsCardAdmin';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'
function LiveVideo() {
  const [CodeValue, setCodeValue] = useState('');
  const [delay, setDelay] = useState(100);
  const [Result, setResult] = useState("");
  const [adminVideoUrl, setAdminVideoUrl] = useState("");
  const history = useHistory();
  useEffect(() => {
    // history.push('/WinnerResult');
    // handleScan = handleScan.bind(this);
    let campaignId = localStorage.getItem('Selected_go_live_campaigns_current_campaignId');
    campaignsService.getById(campaignId).then(campaign => {
      setAdminVideoUrl(campaign.adminVideoUrl);
    });

  }, []);
  const handleScan = (data) => {
    if (data && data.text && Result == '') {
      console.log("data");
      console.log(data);
      localStorage.setItem("currentWinnerCode", data.text);
      history.push('/WinnerResult');
      // setResult(data.text),[
      //     console.log(Result) 
      // ]

    }
  }
  const handleError = (err) => {
    console.error(err)
  }
  const previewStyle = {
    height: 240,
    width: 320,
  }

  return ( 
    <>
      <div className='player-wrapper'>
        <ReactPlayer className='react-player' url={adminVideoUrl} height="100%" width="100%" playing={true} style={{position:'absolute', left:'0', top:'0', overflowY:'hidden'}} />
      </div>
      <div style={{ marginLeft: "1rem", marginTop: "10rem", display:'none' }}>
          <p style={{ fontSize: "20px", fontWeight: "900", color: "rgb(14 26 70)" }}>Scan QR-Code</p>
          <div style={{ alignItems: 'center', height: '50vh' }}>
            <QrReader
              delay={delay}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          </div>
        </div>
      {/* <ActiveCouponsCardAdmin campaignId={localStorage.getItem('Selected_go_live_campaigns_current_campaignId')}></ActiveCouponsCardAdmin> */}
    </>
  );
}
export { LiveVideo };