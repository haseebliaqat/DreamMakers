import React, { useState, useEffect } from 'react';
import './DreamCartInformation.css';

import Card from '@/_shared/dreamCart/Card';
import { TextField } from '@/_shared/TextField/TextField';
import { SelectField } from '@/_shared/SelectField/SelectField';
import CheckoutBtns from '@/_shared/dreamCart/CheckoutBtns';
import CreditCard from '@/_assets/dreamCart/CreditCard.png';
import DreamCartSteper from '@/_shared/dreamCart/DreamCartSteper';
import { NewsLetter } from '@/_shared/newsletter/newsletter';
import { CountryCodeField } from '@/_shared/CountryCodeField/CountryCodeField';
import OrderSummery from '@/_shared/dreamCart/OrderSummery';
import CheckoutBilling from '@/_assets/dreamCart/CheckoutBilling.svg';
import GoogleIcon from '@/_assets/icons/google-sm.png';
import FacebookIcon from '@/_assets/icons/facebook-sm.png';
import AppleIcon from '@/_assets/icons/apple-sm.png';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from "react-router-dom";
import { accountService, alertService } from '@/_services';
import { useGoogleLogin } from 'react-google-login';
import PhoneInput from 'react-phone-number-input'
import countries from '@/_assets/js/countries.json';
import cities from '@/_assets/js/cities.json';
import { Typeahead } from 'react-bootstrap-typeahead'; 
const DreamCartInformation = () => {
   const [count, setCount] = useState(1);
   const [imageShow, setImageShow] = useState(false);
   const history = useHistory();
   const [TermAndCondition, setTermsandcondition] = useState(false);
   const [AlreadyLogin, setAlreadyLogin] = useState(!!localStorage.getItem("user_id")?true:false);
   const [firstname, setfirstname] = useState(localStorage.getItem("f_name"));
   const [last_name, setlast_name] = useState(localStorage.getItem("l_name"));
   const [email, setemail] = useState(localStorage.getItem("user_email"));
   const [paswword, setPassword] = useState("");
   const [nationality, setnationality] = useState("");

   const [phone_no, setphone_no] = useState("");
   const [invite_code, setsetinvite_code] = useState("");
   const [gender_value_male, setGenderValueMale] = useState(false);
   const [gender_value_female, setGenderValueFemale] = useState(false);
   const [campain_price, setCampainPrice] = useState(localStorage.getItem("selected_campaign_discount_value"));
   const [campain_actual_price, setCampainActualPrice] = useState(localStorage.getItem("selected_campaign_value"));
   const [campain_id, setCampainID] = useState(localStorage.getItem("selected_campaign_id"));
   const [campain_discount, setCampainDiscount] = useState(localStorage.getItem("discount_code"));
   const [campain_dreamcoin, setCampainDreamCoin] = useState(localStorage.getItem("dream_coins"));
   const [campain_count, setCampainCount] = useState(localStorage.getItem("item_count_value"));
   const [city_residence, setcityResidence] = useState("");
   const [city, setcity] = useState("");
   const FacebookAppID ='151106640567762';
   const nationalites=countries;
   const citiess=cities;
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
      if (window.innerWidth < 576) setImageShow(true);
      window.addEventListener('resize', () => {
         if (window.innerWidth < 576) setImageShow(true);
         else setImageShow(false);
      });
      return window.removeEventListener('resize', () => {});
   }, [
      
   ]);


   const toggleChange = () => {
      setTermsandcondition(true)
    }
    const OnGenderChangeMale = (event) => {
       console.log(event);
       setGenderValueMale(true)
       setGenderValueFemale(false)
    }
    const OnGenderChangeFemale = (event) => {
      console.log(event);
      setGenderValueFemale(true)
      setGenderValueMale(false)
   }

   const Fname = (event) => {
      console.log(event);
      setfirstname(event.target.value)
   }
   const Lname = (event) => {
      console.log(event);
      setlast_name(event.target.value)
   }
   const Email = (event) => {
      console.log(event);
      setemail(event.target.value)
   }
   const Nationality = (event) => {
      console.log(event);
      setnationality(event.target.value)
   }
   const City = (event) => {
      console.log(event.target.value);
      setcity(event.target.value)
   }
   const TermAndConditions = (event) => {
      console.log(event.target.value);
   }

   const InvititationCode = (event) => {
      console.log(event.target.value);
      setsetinvite_code(event.target.value)
   }

   const changePassword = (event) => {
      console.log(event.target.value);
      setPassword(event.target.value)
   }
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const LoginGuest =() => {
      console.log(TermAndCondition)
      var nationalityVar="";
      var countryResidenceVar = "";
      var cityVar ="";
      if(!!nationality){
         console.log("YOOO111");
         nationalityVar= nationality[0].nationality;
        
        }
        if(!!city_residence){
         countryResidenceVar = city_residence[0].nationality;
        }
      
        if(!!city){
         cityVar =city[0].city;
        }
         
      if(firstname!=""){
         if(last_name!=""){
            if(email!=""){
               if(regEmail.test(email)){
                  if(paswword!=""){
                  if(phone_no!=""){
                     const userDetails = { email:email, firstName:firstname,lastName:last_name, password:paswword,confirmPassword:paswword,nationality:countryResidenceVar,countryResidence:countryResidenceVar,city:cityVar,invite_code:invite_code,mobileNumber:phone_no,title:"Mr",acceptTerms:true}
                     alertService.clear();
                     accountService.loginAsGuest(userDetails).then((resp) => {
                     console.log("resp11111=>>>>>>>>>>>>>>>>", resp);
                     accountService.login(email,paswword).then((resp) => {
                        console.log("resp", resp);
                        console.log("haseeb");
                        console.log(location.state);
                        if (resp.role == 'User') {
                            localStorage.setItem("user",resp.role);
                            localStorage.setItem("userDetails",JSON.stringify(resp));
                           
                           const { from } =  { from: { pathname: "dream-cart-payment" } };
                            history.push(from);
                        }
            
                    }).catch(error => {
                        setSubmitting(false);
                        alertService.error("Email or password is incorrect.");
                    });

                           // if (resp.role == 'User') {
                           // localStorage.setItem("user",resp.role);
                           //    localStorage.setItem("userDetails",JSON.stringify(resp));
                           //       const { from } = { from: { pathname: "/dream-cart-payment" } };
                           //          history.push(from);
                           //       }
                           }).catch(message => {
                              //setSubmitting(false);
                              alert(message);
                              const { from } = { from: { pathname: "/account/login" } };
                                    history.push(from);
                           });
                  }else{
                     alert("Please enter phone");
                  }
               }else{
                  alert("Please enter password");
               }

               }else{
                  alert("Please enter valid email");
               }
            }else{
               alert("Please enter email");
            }
         }else{
            alert("Please enter last name");
         }
      }else{
         alert("Please enter first anme")
      }
    }
   const onStripToken = (token, addresses) => {
      console.log("token " +JSON.stringify(token))
      console.log(token.id)
     const userDetails = { discountCode:campain_discount, campaignId:campain_id,actualPrice:campain_actual_price, discountAmount:campain_price,
     dreamCoinsUsed:"0", cashPaid:campain_price,totalPurchasedCoupons:campain_count, payment_token_id:token.id,
     type_of_payment:"stripe", payemnt_instrument:"card",payemnt_instrument_type:"VISA",
   }
     console.log(userDetails);
     alertService.clear();
     accountService.PurchaseCoupons(userDetails.discountCode,
      userDetails.campaignId,
      userDetails.actualPrice,
      userDetails.discountAmount,
      userDetails.dreamCoinsUsed,
      userDetails.cashPaid,
      userDetails.totalPurchasedCoupons,
      userDetails.payment_token_id,
      userDetails.type_of_payment,
      userDetails.payemnt_instrument,
      userDetails.payemnt_instrument_type,
      ).then((resp) => {
        console.log(resp)
        localStorage.setItem("purchase_detail",JSON.stringify(resp));
            if(addresses!="" ||token){
        const { from } = location.state || { from: { pathname: "/confirmation" } };
        history.push(from);
    }

     }).catch(error => {
         alertService.error("Internal Server Error");
     });
   };

   //  ---------------------------------GoogleLogin-----------------------------------------
const clientId =
'1029775309973-gfl61vqsdvnki7fc5l4261einf0rd67n.apps.googleusercontent.com';
const onSuccess = (res) => {
   console.log('Login Success: currentUser:', res.profileObj);
   // refreshTokenSetup(res);
   const userDetails = { email:res.profileObj.email, firstName:res.profileObj.givenName, lastName:res.profileObj.familyName, imageUrl:res.profileObj.imageUrl }
   alertService.clear();
   accountService.loginUsingGoogle(userDetails.email, userDetails.firstName, userDetails.lastName, userDetails.imageUrl).then((resp) => {
     console.log("resp", resp);
     alert(resp);
     if (resp.role == 'User') {
      localStorage.setItem("user",resp.role);
         localStorage.setItem("userDetails",JSON.stringify(resp));
      
         const { from } = { from: { pathname: "/dream-cart-payment" } };
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
// --------------------------------------------Facebooklogin--------------------------------

const responseFacebook = (res) => {
   console.log('Login Success: currentUser:', res);
   console.log('Login Success: currentUser:', res.picture.data.url);
   const userDetails = { email:res.email, firstName:res.first_name,lastName:res.last_name, imageUrl:res.picture.data.url}
   alertService.clear();
   accountService.loginUsingFacebook(userDetails.email, userDetails.firstName, userDetails.lastName, userDetails.imageUrl).then((resp) => {
     console.log("resp", resp);
     if (resp.role == 'User') {
      localStorage.setItem("user",resp.role);
         localStorage.setItem("userDetails",JSON.stringify(resp));
         const { from } = { from: { pathname: "/dream-cart-payment" } };
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
  const SignInFacebook=()=> {
     FB.login(checkLoginState(), {
      scope: 'email',
      return_scopes: true,
      access_token: FB.getAccessToken() });
  }

  const [stepNo, setstepNo] = useState(2);
   return (
      <>
         <DreamCartSteper value={stepNo} />
         <div className="container-fluid">
            <div className="row">
               {/* <div className="col-12 p-0">
                  <OrderSummery />
               </div> */}

               <div className="col-md-12 col-lg-5 py-md-5 py-3 px-md-3 px-1">
                  <div className="container px-md-5 px-4">
                     <div className="row">
                        <div className="col-md-12">
                           <TextField label="First Name*"                      
                           onChange={Fname}
                           value={firstname}
                           
                            />
                        </div>
                        <div className="col-md-12">
                           <TextField label="Last Name*" 
                           onChange={Lname}
                           value={last_name}
                           />
                        </div>
                        <div className="col-md-12">
                           <TextField label="Email*"                            
                           onChange={Email}
                           value={email}/>
                        </div>
                        <div className="col-md-12">
                           <TextField label="Password*"  
                           type="password"                          
                           onChange={changePassword}
                           value={paswword}/>
                        </div>
                        <div className="col-md-6">
                           {/* <SelectField label="Nationality"                            
                           onChange={Nationality}
                           value={nationality} /> */}
                           <Typeahead label="Country of Residence" 
                                    labelKey="nationality"
                                    placeHolders="Country of Residence"
                                    onChange={(selected) => {
                                       setcityResidence(selected);
                                    }}
                                    options={nationalites}
                                    selected={city_residence}
                                    placeholder="Country of Residence"
                                    inputProps={{
                                       className: 'my-custom-classname',
                                       style: {
                                          'height': "calc(1.5em + 1.75rem + 2px)",
                                       }
                                     }}
                                 />
                        </div>
                        <div className="col-md-6">
                        <div className="subscription-form" >
                           {/* <SelectField label="City"                            
                           onChange={City}
                           value={city}/> */}
                           <Typeahead label="City" 
                                    labelKey="city"
                                    placeHolders="City"
                                    onChange={(selected) => {
                                       setcity(selected);
                                    }}
                                    options={citiess}
                                    selected={city}
                                    placeholder="City"
                                    inputProps={{
                                       className: 'my-custom-classname',
                                       style: {
                                          'height': "calc(1.5em + 1.75rem + 2px)",
                                       }
                                     }}
                           /> 
                           </div>
                        </div>
                        <div className="col-6 col-md-6">
                           <div className="d-flex align-items-center mb-2" style={{marginTop:"1rem"}}>
                              <div className="">
                                 <input
                                    type="radio"
                                    value={1}
                                    className="radioButtonCustom"
                                    value={gender_value_male} 
                                    name="checkedI"  onChange={OnGenderChangeMale} 
                                    checked={gender_value_male}
                                    style={{WebkitAppearance:"radio"}}
                                 />
                              </div>
                              <div className="ml-2 radioButttonFont font-16">
                                 Male
                              </div>
                           </div>
                        </div>
                        <div className="col-6 col-md-6">
                           <div className="d-flex align-items-center mb-2" style={{marginTop:"1rem"}}>
                              <div className="">
                                 <input
                                    type="radio"
                                    value={2}
                                    className="radioButtonCustom"
                                    value={gender_value_female} 
                                    name="checkedI"  onChange={OnGenderChangeFemale} 
                                    checked={gender_value_female}
                                    style={{WebkitAppearance:"radio"}}
                                 />
                              </div>
                              <div className="ml-2 radioButttonFont font-16">
                                 Female
                              </div>
                           </div>
                        </div>
                        <div className="col-md-12">
                           {/* <CountryCodeField label="Country Code" 
                           onChange={PhoneNumber}
                           value={phone_no}
                           /> */}
                           <div  style={{border:"1px solid #dbdada",borderRadius:"10px",fontSize:"16px",height:"48px",marginBottom:"24px"}}>
                           <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry="US"
                                value={phone_no}
                                onChange={setphone_no}
                                />
                            </div>
                           
                        </div>
                        <div className="col-md-12">
                           <TextField label="Invitation Code" 
                                   onChange={InvititationCode}                           
                           value={invite_code}/>
                        </div>
                        <div className="col-md-12">
                           <div className="d-flex align-items-center mb-2">
                              <div className="pt-2">
                                 <input
                                    type="checkbox"
                                    style={{WebkitAppearance:"checkbox"}}
                                    value={TermAndCondition}
                                    onChange={TermAndConditions}
                                    
                                    className="radioButtonCustom"
                            
                                 />
                              </div>
                              <div className="ml-2 radioButttonFont font-16" style={{WebkitAppearance:"radio"}}>
                                 I accept the Policy and Terms{' '}
                                 <a href="#" className="textColor">
                                    Read
                                 </a>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-12">
                           <div className="mt-5">
                           <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",width:"465px",backgroundColor:"rgb(22, 99, 190)",color:"aliceblue"}} onClick={LoginGuest}>
                                 <img
                                    src={imageShow ? CheckoutBilling : CreditCard}
                                    alt=""
                                    height={30}
                                    className="absoluteClass U-paddingLeftText"
                                    style={{paddingLeft:"35px"}}
                                 />
                                 <span className="FloarRight-Responsive">Countinue for Checkout</span>
                                 </button>
                              {/* {!!AlreadyLogin!=""?
                              <StripeCheckout
                              label="Strip"
                              amount={!!campain_price?" "+campain_price:""}
                              //   description="Awesome Product"
                              //   image={Logo}
                              locale="auto"
                              name="https://dreammakers.ae/"
                              stripeKey="pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA"
                              token={onStripToken}
                              className={`btn form-control my-1 buttonRound`} 
                              style={{border:"1px solid",backgroundColor:"none"}}
                              currency="AED"
                              email={email}
                              zipCode={false}
                              >
                                 <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",width:"465px",backgroundColor:"rgb(22, 99, 190)",color:"aliceblue"}}>
                                 <img
                                    src={imageShow ? CheckoutBilling : CreditCard}
                                    alt=""
                                    height={30}
                                    className="absoluteClass U-paddingLeftText"
                                    style={{paddingLeft:"35px"}}
                                 />
                                 <span className="FloarRight-Responsive">Countinue for Checkout</span>
                                 </button>
                         </StripeCheckout>:
                         <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",backgroundColor:"#1663BE",color:"#FFFFFF"}} onClick={LoginGuest} >
                               <span className="FloarRight-Responsive">Login</span>
                            </button>
                           } */}
                           
                              {/* {firstname!=""?
                              <div></div>
                              :<div>
                                 
                                 </div>} */}
                                 {/* <Link to="/dream-cart-payment">
                                    <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",backgroundColor:"#1663BE",color:"#FFFFFF"}} >
                                    <img
                                             src={imageShow ? CheckoutBilling : CreditCard}
                                             alt=""
                                             height={24}
                                             className="absoluteClass U-paddingLeftText"
                                          />
                                          <span className="FloarRight-Responsive">Countinue for Checkout</span>
                                       </button>
                                 </Link> */}
                              {/* <CheckoutBtns
                                 text="Countinue to Payment"
                                 img={imageShow ? CheckoutBilling : CreditCard}
                                 color="#fff"
                                 backgroundColor="#1663BE"
                                 border="1px solid #707070"
                              /> */}
                           </div>
                        </div>
                     </div>

                     <div className="d-flex align-items-center justify-content-center flex-column dream-cart__social-container">
                        <h6>Sign in with</h6>
                        <ul className="dream-cart__social">
                           <li>
                              
                              <div onClick={signIn}>
                              <a  mblStyle='' history={history} location={location}>

                                 <img src={GoogleIcon} alt="google"  />
                              </a>
                              </div>
                           </li>
                           <li>
                           <div onClick={SignInFacebook}>
                               <a  mblStyle='' history={history} location={location}>
                              <img src={FacebookIcon} alt="facebook" />
                              </a>
                              </div>

                           </li>
                           <li>
                              <a mblStyle='' history={history} location={location}>
                                 <img src={AppleIcon} alt="apple" />
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               
               <div className="col-md-12 col-lg-7 cardNoShowLess768">
                  <Card count={count} setCount={setCount} />
               </div>
               <div className="col-12">
                  <NewsLetter />
               </div>
            </div>
         </div>
      </>
   );
};

export default DreamCartInformation;
