import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import Google from '@/_assets/images/google.png';
import { accountService, alertService } from '@/_services';

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '1029775309973-gfl61vqsdvnki7fc5l4261einf0rd67n.apps.googleusercontent.com';

function LoginGoogle({mblStyle, history, location }) {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // refreshTokenSetup(res);
    const userDetails = { email:res.profileObj.email, firstName:res.profileObj.givenName, lastName:res.profileObj.familyName, imageUrl:res.profileObj.imageUrl,mobileNumber:"NA",nationality :"NA",countryResidence :"NA",city :"NA",acceptTerms:"true" }
    alertService.clear();
    accountService.loginUsingGoogle(userDetails.email, userDetails.firstName, userDetails.lastName, userDetails.imageUrl,userDetails.mobileNumber,userDetails.nationality,userDetails.countryResidence,userDetails.city,userDetails.acceptTerms).then((resp) => {
      console.log("resp", resp);
      if (resp.role == 'Admin') {
          const { from } = { from: { pathname: "/admin" } };
          history.push(from);
      }
      else if (resp.role == 'User') {
        localStorage.setItem("user",resp.role);
        console.log("aqib");
          localStorage.setItem("userDetails",JSON.stringify(resp));
         
         const { from } =  { from: { pathname: "/" } };
          history.push(from);
      }

    }).catch(error => {
        //setSubmitting(false);
        alertService.error("Email or password is incorrect.");
    });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alertService.error("Failed to login. 😢");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div className={ `google-btn ${mblStyle}` } onClick={signIn}>
            <span>
                <img src={Google} />
            </span>
            <p >Log In with Google</p>
        </div>

    
  );
}

export {LoginGoogle};