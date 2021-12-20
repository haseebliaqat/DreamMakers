import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
 function  InvitationCodePage( match  ) {
    const history = useHistory();
    const { path } = match;
    const [CodeValue, setCodeValue] = useState('');
    useEffect(() => {
    }, []);
    const GoLive=()=>{
        if(CodeValue!=""){
            localStorage.setItem("go_live_pin",CodeValue)
            history.push('/SeletedCampaignListView');
        }else{
            alert("Please enter a pin ")
        }
       
    }
    const GoTest=()=>{
        if(CodeValue!=""){
            localStorage.setItem("go_test_pin",CodeValue)
            history.push('/SeletedCampaignListView');
        }else{
            alert("Please enter a pin ")
        }
    }
    const OPTCodeChange=(value)=>{
        console.log(value)
        setCodeValue(value)
        
        let temp = '';
        for(let i=0; i< value.length; i++) temp+='*'
        setCodeValue(temp);



    }
    return (
        <div>
            <div style={{textAlign:"center"}} className="pin">
                    <p style={{fontSize:"15px",marginBottom:"6rem"}}>Enter 4 Digit PIN</p>
                    <div>
                        <OtpInput
                            value={CodeValue}
                            separator={
                                <span>
                                  <strong>-</strong>
                                </span>
                              }
                            inputStyle={{
                                width: "5rem",
                                height: "3rem",
                                fontSize: "2rem",
                                borderRadius: 4,
                                border: "1px solid rgba(0,0,0,0.3)"
                              }}
                            onChange={OPTCodeChange}
                            numInputs={4}
                        />
                    </div>
                    <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"130px"}} >
                        {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
                         <p><Link><button  className="live-draw" onClick={GoLive}>Go Live <span className="dot"></span></button></Link></p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"13px"}} >
                        {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
                         <p><Link><button  className="Go-Test" onClick={GoTest}>Test Live <span className="dot"></span></button></Link></p>
                    </div>
                </div>
        </div>
    );
}
export { InvitationCodePage };