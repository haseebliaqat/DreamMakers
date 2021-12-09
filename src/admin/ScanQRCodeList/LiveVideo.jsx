import React, { useEffect, useState } from "react";
import QrReader from 'react-qr-scanner'
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'
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
                    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' height="578px" width="71%" />
                        <div style={{marginLeft:"1rem",marginTop:"10rem"}}>
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