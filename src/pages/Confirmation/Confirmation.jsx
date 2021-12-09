import React, { useEffect, useState } from 'react';
import './Confirmation.less';
import { CouponCard } from '@/_shared/CouponCard/CouponCard';
import { DownloadButton } from '@/_shared/DownloadButton/DownloadButton';
import flower from '@/_assets/images/flower.png';
import DreamCartSteper from '@/_shared/dreamCart/DreamCartSteper';
import { NewsLetter } from '@/_shared/newsletter/newsletter';
import { Link } from 'react-router-dom';
import Pdf from "react-to-pdf";
import Logo from '../../_assets/images/Logo.png';
const Confirmation = () => {
   const [ShowRecept, seReceiptImage] = useState(false);
   const ref = React.createRef();
   const [user, setUser] = useState(null);
   const [today, setDate] = React.useState(new Date()); 
   const [coupon_detail, setCouponsDetail] = useState(null);
   const locale = 'en';
   
   useEffect(() => {
      if (!!localStorage.userDetails) {            
         setUser(JSON.parse(localStorage.userDetails));
         //console.log(user);
      }
      if (!!localStorage.purchase_detail) {            
         setCouponsDetail(JSON.parse(localStorage.purchase_detail));
         //console.log(user);
      }
      
      //alert("uer");
  }, [
     console.log(today),
  ]);
  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric',second:"numeric" });

  const [stepNo, setstepNo] = useState(4);
   return (
      <>
         <DreamCartSteper value={stepNo} />
         <div className="ConfirmationHeader">
            <h1 className="confirmation-Color-h">Thank You</h1>
            <img src={flower} alt="image" />
            <h1 className="confirmation-Color-h">Good Luck</h1>
            <p className="confirmation-Color-p">Your order has been received</p>
            <p className="confirmation-Color-p">
               Please check you email or dashboard for further details
            </p>
            <p className="confirmation-Color-h">Your Coupon</p>
            <div className="d-inline-block" ref={ref}>
               <CouponCard />
               <p className="do_not_share__p">
                  *Please do not share your coupon or receipt
               </p>
            </div>

            <div className="con__btn__containers">
               
               <Pdf targetRef={ref} filename={!!user?user.firstName+user.lastName+"_Coupon_Receipt_"+time.replace(" ","")+".pdf":""} style={{height:"200px",width:"8.11in"}}>
                  {({ toPdf }) => <DownloadButton onClick={toPdf} label="Download Receipt" />}
               </Pdf>
               <Link to="/">
               <DownloadButton
                  className="without__icon btn btn-download"
                  label="continue shopping"
                  
               />
               </Link>
            </div>
         </div>
         <div>
         </div>
         <div className="col-12">
                  <NewsLetter />
               </div>
      </>
   );
};

export default Confirmation;
