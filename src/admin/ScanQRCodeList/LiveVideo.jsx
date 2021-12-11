import React, { useEffect, useState } from "react";
import QrReader from 'react-qr-scanner'
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'
import './LiveVideo.css'
const divStyle1 = {
  height:"auto",
  maxwidth:"100%"
};
 function  LiveVideo() {
    const [CodeValue, setCodeValue] = useState('');
    const [delay, setDelay] = useState(100);
    const [Result, setResult] = useState("");
    const history = useHistory();

    useEffect(() => {
        // history.push('/WinnerResult');
        // handleScan = handleScan.bind(this)
    }, []);
    const handleScan=(data)=>{
        if(data && data.text && Result== ''){
            console.log("data");
            console.log(data);
            localStorage.setItem("currentWinnerCode",data.text);
            history.push('/WinnerResult');
            // setResult(data.text),[
            //     console.log(Result) 
            // ]
        }
      }
      const handleError=(err)=>{
        console.error(err)
      }
      const previewStyle = {
        height: 240,
        width: 320,
      }
        
    return (
        <div>
                <div style={{textAlign:"center",marginTop:"1px",marginLeft:"1px",display:"flex"}}>
                              <ReactPlayer
                                  className='react-player'
                                  url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                                  width='100%'
                                  height='100%'
                                />
                        <div style={{marginLeft:"1rem",marginTop:"10rem;",display:"none"}}>
                        <p style={{fontSize:"20px",fontWeight:"900",color:"rgb(14 26 70)"}}>Scan QR-Code</p>
                        <div style={{alignItems:'center', height: '50vh'}}>
                                <QrReader
                                delay={delay}
                                style={previewStyle}
                                onError={handleError}
                                onScan={handleScan}
                                />            
                        </div>
                        </div>
                </div>
        </div>
    );
}
export { LiveVideo };