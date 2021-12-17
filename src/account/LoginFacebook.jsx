import React, { useEffect, useState } from 'react';
import Facebook from '@/_assets/images/facebook.png';
import { accountService, alertService } from '@/_services';
import './facebook-login-button1.less';
import { useHistory } from "react-router-dom";
const FacebookAppID ='151106640567762';

function LoginFacebook({mblStyle}) {
  const history = useHistory();
      useEffect(() => {

        
        window.fbAsyncInit = function() {
          FB.init({
            appId      : FacebookAppID,
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true ,
            version: 'v8.0'
          });
          window.FB.getLoginStatus(({ authResponse }) => {
            if (authResponse) {
                accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
            } else {
                resolve();
            }
        });
        }.bind(this);
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk')); 
      }, []);
      const responseFacebook = (res) => {
        console.log('Login Success: currentUser:', res);
        console.log('Login Success: currentUser:', res.picture.data.url);
        const userDetails = { email:res.email, firstName:res.first_name,lastName:res.last_name, imageUrl:res.picture.data.url,mobileNumber:"NA",nationality :"NA",countryResidence :"NA",city :"NA",acceptTerms:"true"}
        alertService.clear();
        accountService.loginUsingGoogle(userDetails.email, userDetails.firstName, userDetails.lastName, userDetails.imageUrl,userDetails.mobileNumber,userDetails.nationality,userDetails.countryResidence,userDetails.city,userDetails.acceptTerms).then((resp) => {
          console.log("resp", resp);
          if (resp.role == 'Admin') {
              const { from } =  { from: { pathname: "/admin" } };
              history.push(from);
          }
          else if (resp.role == 'User') {
            localStorage.setItem("user",resp.role);
              localStorage.setItem("userDetails",JSON.stringify(resp));
             
             const { from } =  { from: { pathname: "/" } };
              history.push(from);
          }
    
        }).catch(error => {
            //setSubmitting(false);
            alertService.error("Email or password is incorrect.");
        });
      }
      const testAPI=()=> {
        
        FB.api('/me?fields=id,first_name,last_name,email,link,gender,locale,picture,permissions', function(response) {
        responseFacebook(response);
        });
      }

    const statusChangeCallback=(response)=> {
      if (response.status === 'connected') {
        testAPI();
      } else if (response.status === 'not_authorized') {
        console.log('error1');
      } else {
        console.log('error2');
      }
    }
  const checkLoginState=()=> {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  const SignIn=()=> {
     FB.login(checkLoginState(), 
     {scope: 'email',
      return_scopes: true,
      access_token: FB.getAccessToken() });
  }

    return (
        <div  className={ `facebook-btn ${mblStyle}` }  onClick={SignIn} >
            <span>
                <img src={Facebook}  />
            </span>
            <p >Log In with Facebook</p>   
        </div>
    );
}

export { LoginFacebook };