import React, { useEffect, useState } from 'react';
import './ChangePassword.less';
import { Card } from '@/_shared/card/card';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField } from '@/_shared/TextField/TextField';
import { ProfileCard } from '@/_shared/profile-card/profile-card';
import { Doughnut } from '../../_shared/doughnut/doughnut';
import { H1Heading } from '../../_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';
import { NewsLetter } from '../../_shared/newsletter/newsletter';
import { PButton } from '../../_shared/PButton/PButton';
import { accountService, alertService } from '@/_services';
import { Alert } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { SubHeader } from '../../_components/SubHeader/SubHeader';
import * as Yup from 'yup';
import Loader from "react-js-loader";
export const ChangePassword = () => {
   const history = useHistory();
   const [resSuccessShow, setResSuccessShow] = useState(false);
   const [resSuccessMessage, setResSuccessMessage] = useState("");
   const [resShow, setResShow] = useState(false);
   const [resMessage, setResMessage] = useState("");
   const [user, setUser] = useState(null);
   const [loader, SetLoader] = React.useState([false]);
   useEffect(() => {
      if (!!localStorage.userDetails) {            
         setUser(JSON.parse(localStorage.userDetails));
      }
    }, [
       console.log(user)
    ]);

    const initialValues = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      
  };
  const validationSchema = Yup.object().shape({
   email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
   password: Yup.string().required('Password is required')
});
function onSubmit() {
   alertService.clear();
   var oldPassword = document.getElementById('oldPassword').value;
   var newPassword = document.getElementById('newPassword').value;
   var confirmPassword = document.getElementById('confirmPassword').value;

   if(oldPassword ==""){
      setResShow(true);
      setResMessage("Please enter old password.");
      SetLoader(false);
      return false;
   }
  
   if(newPassword===""){
      setResShow(true);
      setResMessage("Please enter new password.");
      SetLoader(false);
      return false;
   }

   if(confirmPassword==""){
      setResShow(true);
      setResMessage("Please enter confirm password.");
      SetLoader(false);
      //alertService.error("Please enter confirm password.");
      return false;
   }else{
      if(newPassword!==confirmPassword){
         setResShow(true);
         setResMessage("New password and confirm password does not match");
         SetLoader(false);
         // alertService.error("New password and confirm password does not match");
         return false;
      }
   }
   SetLoader(true);
   var token=!!user?user.jwtToken:"";
   const params={token:token,password:newPassword,confirmPassword:confirmPassword,accountID:!!user?user.id:""}
   accountService.updatePassword(params).then((resp) => {
      console.log("resp=>>>>>")
      console.log(resp)
      console.log(resp.role)
      setResSuccessShow(true);
      setResSuccessMessage("Password Updated.");
        if (resp.role == 'User') {
         localStorage.setItem("user",resp.role);
         localStorage.setItem("userDetails",JSON.stringify(resp));
         const { from } =  { from: { pathname: "/profile" } };
           history.push(from);
       }

   }).catch(error => {
      // setSubmitting(false);
       alertService.error("Email or password is incorrect.");
   });
}
const [avalaibel_dream_coin, setAvalaibleDreamCoins] = useState(null);
const [avalaibel_balance, setAvalaibleBalance] = useState(null);
const GetAllWinners =()=> {
      
   let obj1 = {
      "limit": 5,
      "offset": 0,
      "order": [["id", "DESC"]],
      "where":{"id":{"$gt":0},"accountId":localStorage.getItem("user_id") }
  }
   alertService.clear();
   accountService.AvailabelBalance(obj1).then((resp) => {
      var myJson= resp.rows;
      setAvalaibleBalance(myJson[0].currencyValue);
      setAvalaibleDreamCoins(myJson[0].balance);
      
      

   }).catch(error => {
       alertService.error("Internal Server Error");
   });
 }
 useEffect(() => {
   GetAllWinners();

}, []);
   return (
      <div className="container-fluid">
      <div className="changepassword-page">
         {resSuccessShow?  
                                             
            <Alert color="success" onClick={() => setResSuccessShow(false)} dismissible >
                  {resSuccessMessage}
            </Alert>
          :''}
         <div className="row">
            <div className="col-md-4 d-md-block  d-none">
               <ProfileCard />
            </div>
            <div className="col-md-8">
               <Card className="d-md-block d-none">
                 <div className="doughnut-container">
                     <Doughnut
                        title="AED"
                        value={avalaibel_balance}
                        footerTitle="Your available balance"
                        style={{fontSize:"20px"}}
                     />
                     <Doughnut
                        color="#03DAC5"
                        value={avalaibel_dream_coin}
                        footerTitle="Your available dream coins"
                        style={{fontSize:"20px"}}
                     />
                  </div>
               </Card>
               <div className="change-password__heading-container mt-3">
                  <H1Heading>Change Password</H1Heading>
                  <PButton  onClick={() => onSubmit()} label="update" />
               </div>
               <div className="d-md-none d-block">
                     <SubHeader title="Change Password" />
                  </div>
               <div className="mt-4 changepassword-container">
               <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
               {({ errors, touched, isSubmitting }) => (
                
                  <form onSubmit={onSubmit}>
                    {resShow?  
                                             
                        <Alert color="danger" onClick={() => setResShow(false)} dismissible >
                              {resMessage}
                        </Alert>:''
                     }
                    
                     <TextField
                        label="Old Passowrd"
                        showPasswordIcon
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        onClick={() => setResShow(false)}
                     />
                     <TextField
                        label="New Password"
                        showPasswordIcon
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        onClick={() => setResShow(false)}
                     />
                     <TextField
                        label="Confirm Password"
                        showPasswordIcon
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onClick={() => setResShow(false)}
                     />
                     <div className="text-center d-md-none d-block" >
                       <PButton disabled={isSubmitting} onClick={() => onSubmit()}  label="update" />
                        
                     </div>
                  </form>
                  )}
                  </Formik> 
               </div> 
            </div>
            
         </div>
         <div className="d-md-block d-none">
            <NewsLetter />
         </div>
      </div>
   </div>
   );
};
