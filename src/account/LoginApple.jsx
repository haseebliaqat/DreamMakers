import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import Apple from '@/_assets/images/apple-logo.png';
import { accountService, alertService } from '@/_services';

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const appleId =
  '1029775309973-gfl61vqsdvnki7fc5l4261einf0rd67n.apps.googleusercontent.com';

function LoginApple({mblStyle, history, location }) {
      useEffect(() => {
        // window.AppleID.auth.init({
        //     clientId: "", // This is the service ID we created.
        //     scope: "name email", // To tell apple we want the user name and emails fields in the response it sends us.
        //     redirectURI: "", // As registered along with our service ID
        //     state: "origin:web", // Any string of your choice that you may use for some logic. It's optional and you may omit it.
        //     usePopup: true, // Important if we want to capture the data apple sends on the client side.
        //   });
      }, []);
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // refreshTokenSetup(res);
    const userDetails = { email:res.profileObj.email, firstName:res.profileObj.givenName, lastName:res.profileObj.familyName, imageUrl:res.profileObj.imageUrl }
    alertService.clear();
    accountService.loginUsingGoogle(userDetails.email, userDetails.firstName, userDetails.lastName, userDetails.imageUrl).then((resp) => {
      console.log("resp", resp);
      if (resp.role == 'Admin') {
          const { from } = location.state || { from: { pathname: "/admin" } };
          history.push(from);
      }
      else if (resp.role == 'User') {
        console.log("aqib");
          localStorage.setItem("userDetails",JSON.stringify(resp));
         
         const { from } = location.state || { from: { pathname: "/" } };
          history.push(from);
      }

    }).catch(error => {
        //setSubmitting(false);
        alertService.error("Email or password is incorrect.");
    });
  };


  const singInApple = () => {
    const response =  window.AppleID.auth.signIn();
    return response;
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