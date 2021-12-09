import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";
 function  CouponCodePage() {
    const [CodeValue, setCodeValue] = useState('');
    const history = useHistory();
    useEffect(() => {
    }, []);
    const GoLive=()=>{
       if(CodeValue!=""){
           if(CodeValue.length==5){
            history.push('/VerifyCoupon');
           }else{
               alert("Please enter requried code")
           }
       }else{
           alert("Please enter a coupon code")
       }
    }
    const OPTCodeChange=(value)=>{
        console.log(value)
        setCodeValue(value)
    }
    return (
        <div>
            <div style={{textAlign:"center"}} className="pin">
                    <p style={{fontSize:"15px",marginBottom:"6rem"}}>Enter Coupon Code</p>
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
                            numInputs={5}
                        />
                    </div>
                    <div style={{display:"flex", justifyContent:"center", width:"100%", padding:"0",marginTop:"130px"}} >
                        {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
                         <p><Link><button  className="live-draw" onClick={GoLive}>Verify</button></Link></p>
                    </div>
                </div>
        </div>
    );
}
export { CouponCodePage };