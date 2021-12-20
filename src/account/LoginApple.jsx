import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import Apple from '@/_assets/images/apple-logo.png';
import { accountService, alertService } from '@/_services';
import { appleAuthHelpers } from 'react-apple-signin-auth';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const appleId =
  '1029775309973-gfl61vqsdvnki7fc5l4261einf0rd67n.apps.googleusercontent.com';

function LoginApple({mblStyle, history, location }) {
      useEffect(() => {
      }, []);
  const onSuccess = (res) => {
    // console.log('Login Success: code:', res.authorization[0].code);
    // console.log('Login Success: code:', res.authorization.code);
    // console.log('Login Success: email', res.user[0].email);
    // console.log('Login Success: email:', res.user.email);
    // const userDetails;
    // if(!!res.user){
    //   userDetails = { code:res.authorization[0].code,email:res.user[0].email, firstName:res.user[0].name.firstName,lastName:res.user[0].name.lastName, imageUrl:"",mobileNumber:"NA",nationality :"NA",countryResidence :"NA",city :"NA",acceptTerms:"true"}
    // }else{
    //   userDetails = { code:res.authorization[0].code, firstName:"NA",lastName:"NA", imageUrl:"NA",mobileNumber:"NA",nationality :"NA",countryResidence :"NA",city :"NA",acceptTerms:"true"}
    // }
    // console.log('Login Success: email:', userDetails);
    // alertService.clear();
    // accountService.loginUsingGoogle(userDetails.code,userDetails.email, userDetails.firstName, userDetails.lastName, userDetails.imageUrl,userDetails.mobileNumber,userDetails.nationality,userDetails.countryResidence,userDetails.city,userDetails.acceptTerms).then((resp) => {
    //   console.log("resp", resp);
    //   if (resp.role == 'Admin') {
    //       const { from } =  { from: { pathname: "/admin" } };
    //       history.push(from);
    //   }
    //   else if (resp.role == 'User') {
    //     console.log("aqib");
    //       localStorage.setItem("userDetails",JSON.stringify(resp));
         
    //      const { from } =  { from: { pathname: "/" } };
    //       history.push(from);
    //   }

    // }).catch(error => {
    //     //setSubmitting(false);
    //     alertService.error("Email or password is incorrect.");
    // });
  };

  const singInApple = async () => {
    const response = await appleAuthHelpers.signIn({
      authOptions: {
        clientId: 'ae.dreammakers.test',
        redirectURI: 'https://test.dreammakers.ae',
        state: 'state',
        responseMode: 'query' | 'fragment' | 'form_post', // Force set to form_post if scope includes 'email'
        scope: 'email name',
        nonce: 'nonce', 
      },
      onSuccess:(resp) => console.log(resp),
      onError: (error) => console.error(error)
    });
    if (response) {
      console.log(response);
    } else {
      console.error('Error performing apple signin.');
    }
  };

  return (
    
    <div className={ `apple-btn ${mblStyle}` } onClick={singInApple}>
            <span>
                <img src={Apple} style={{width:"26px",height:"20px"}} />
            </span>
            <p style={{textAlign:"center",fontSize:"14px"}}>Log In with Apple</p>
        </div>

    
  );
}

export {LoginApple};