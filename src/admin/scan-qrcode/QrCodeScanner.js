import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
import qrCode from '../../_assets/images/qrCode.png';
import Logo from '../../_assets/images/Logo.png';
export class QrCodeScanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: '',
      first_name:"",
      last_name:"",
      email:"",
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if(data && data.text && this.state.result == ''){
        console.log(data);
        this.setState({
            result: data.text,
          })
    }

    // this.setState({
    //   result: data,
    // })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }
    if(this.state.result == '')
    return(
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>               
      </div>
    )
    else{
        return(
         <div>
            <p>Winner Aqib Ali </p>
          <div className="coupons-card">
            <img src={CouponsCardBg} alt="" width="100%" />
            <div className="header">
               <img src={Logo} alt="" />
            </div>
            <div className="EL-number">EL65656-5454545</div>
            <div className="EL-coupon">coupons No. 12232323232</div>
            <div className="price">Prize</div>
            <div className="Trip-country">Maldives</div>
            <div className="Qr">
                  <img src={qrCode} alt="QR" style={{ width: '100%' }} />
               </div>
            <div className="dottedLine"></div>
            <div className="purchase-date">Purchase On:</div>
            <div className="date">12 September 2021</div>
            <div className="coupon-name">Name:</div>
            <div className="name">Aqib Ali</div>
         </div>
         </div>
        )
        
    }
  }
}