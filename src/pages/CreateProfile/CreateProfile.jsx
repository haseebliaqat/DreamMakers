import React, { useState, useEffect } from 'react';
import './CreateProfile.less';
import '@/_shared/SelectField/SelectField.less';
import '@/_shared/TextField/TextField.less';
import { accountService, alertService } from '@/_services';
import { Card } from '@/_shared/card/card';
import { TextField } from '@/_shared/TextField/TextField';
import { ProfileCard } from '@/_shared/profile-card/profile-card';
import { Doughnut } from '../../_shared/doughnut/doughnut';
import { H1Heading } from '../../_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';
import { NewsLetter } from '../../_shared/newsletter/newsletter';
import { PButton } from '../../_shared/PButton/PButton';
import { SelectField } from '../../_shared/SelectField/SelectField';
import { CountryCodeField } from '../../_shared/CountryCodeField/CountryCodeField';
import { Typeahead } from 'react-bootstrap-typeahead';
import countries from '@/_assets/js/countries.json';
import cities from '@/_assets/js/cities.json';
import { Alert } from 'reactstrap';
import { Footer } from '@/_components/Footer/Footer';

export const CreateProfile = () => {
   const menuStyle = {
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0',
      fontSize: '90%',
      position: 'fixed',
      overflow: 'auto',
      maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
      zIndex: 100,
   };
   const [resSuccessShow, setResSuccessShow] = useState(false);
   const [resSuccessMessage, setResSuccessMessage] = useState('');
   const [resShow, setResShow] = useState(false);
   const [resMessage, setResMessage] = useState('');
   const [user, setUser] = useState('');
   const [firstname, setfirstname] = useState(localStorage.getItem('f_name'));
   const [last_name, setlast_name] = useState(localStorage.getItem('l_name'));
   const [email, setemail] = useState(localStorage.getItem('user_email'));
   const [nationality, setnationality] = useState([]);
   const [city_residence, setcityResidence] = useState('');
   const [city, setcity] = useState('');
   const [phone, setPhone] = useState('');

   const nationalites = countries;
   const citiess = cities;

   useEffect(() => {
      if (!!localStorage.userDetails) {
         setUser(JSON.parse(localStorage.userDetails));
         let usr = JSON.parse(localStorage.userDetails);
         setnationality([usr.nationality]);
         setPhone(usr.mobileNumber);
         setcity([usr.city]);
         setcityResidence([usr.countryResidence]);
      }
   }, []);
   const Phoneno = (val) => {
      setPhone(val);
      setResShow(false);
   };
   const Fname = (event) => {
      console.log(event);
      setfirstname(event.target.value);
      setResShow(false);
   };
   const Lname = (event) => {
      console.log(event);
      setlast_name(event.target.value);
      setResShow(false);
   };
   const Email = (event) => {
      console.log(event);
      setemail(event.target.value);
      setResShow(false);
   };
   const Nationality = (event) => {
      console.log(event);
      setnationality(event.target.value);
      setResShow(false);
   };
   const CityResidence = (event) => {
      console.log(event);
      setcityResidence(event.target.value);
      setResShow(false);
   };
   const City = (event) => {
      console.log(event);
      setcity(event.target.value);
      setResShow(false);
   };
   const [avalaibel_dream_coin, setAvalaibleDreamCoins] = useState(null);
   const [avalaibel_balance, setAvalaibleBalance] = useState(null);
   const GetAllWinners = () => {
      let obj1 = {
         limit: 5,
         offset: 0,
         order: [['id', 'DESC']],
         where: { id: { $gt: 0 }, accountId: localStorage.getItem('user_id') },
      };
      alertService.clear();
      accountService
         .AvailabelBalance(obj1)
         .then((resp) => {
            var myJson = resp.rows;
            setAvalaibleBalance(myJson[0].currencyValue);
            setAvalaibleDreamCoins(myJson[0].balance);
         })
         .catch((error) => {
            alertService.error('Internal Server Error');
         });
   };
   useEffect(() => {
      GetAllWinners();
   }, []);
   function onSubmit() {
      var firstName = firstname;
      var lastName = last_name;
      var email = email;
      var mobileNumber = phone;
      var nationalityVar = '';
      var countryResidenceVar = '';
      var cityVar = '';
      if (!!nationality) {
         nationalityVar = nationality
            ? nationality?.nationality
            : nationality[0].nationality;
      }
      if (!!city_residence) {
         countryResidenceVar = city_residence
            ? city_residence?.nationality
            : city_residence[0].nationality;
      }

      if (!!city) {
         console.log(city);
         cityVar = city ? city[0] : city[0].city;
      }

      if (firstName == '') {
         setResShow(true);
         setResMessage('Please enter first name.');
         return false;
      }

      if (lastName === '') {
         setResShow(true);
         setResMessage('Please enter last name.');

         return false;
      }

      if (email === '') {
         setResShow(true);
         setResMessage('Please enter email.');
         return false;
      }

      // if(mobileNumber===""){
      //    setResShow(true);
      //    setResMessage("Please enter phone.");

      //    return false;
      // }

      // if(nationalityVar===""){
      //    setResShow(true);
      //    setResMessage("Please select a nationality.");

      //    return false;
      // }

      // if(countryResidenceVar===""){
      //    setResShow(true);
      //    setResMessage("Please select a country residence.");

      //    return false;
      // }

      // if(cityVar===""){
      //    setResShow(true);
      //    setResMessage("Please select a city.");

      //    return false;
      // }

      var token = !!user ? user.jwtToken : '';

      const params = {
         firstName: firstName,
         lastName: lastName,
         email: email,
         mobileNumber: mobileNumber,
         nationality: nationalityVar,
         countryResidence: countryResidenceVar,
         city: cityVar,
         accountID: !!user ? user.id : '',
      };
      accountService
         .updatePersonalDetail(params)
         .then((resp) => {
            console.log('resp=>>>>>');
            console.log(resp);
            console.log(resp.role);
            setResSuccessShow(true);
            setResSuccessMessage('User Updated.');
            if (resp.role == 'User') {
               localStorage.setItem('user', resp.role);
               localStorage.setItem('userDetails', JSON.stringify(resp));
               const { from } = { from: { pathname: '/profile' } };
               history.push(from);
            }
         })
         .catch((error) => {
            alertService.error('Email or password is incorrect.');
         });
   }

   return (
      <>
         <div className="container-fluid">
            <div className="create-profile-page">
               {resSuccessShow ? (
                  <Alert
                     color="success"
                     onClick={() => setResSuccessShow(false)}
                     true
                  >
                     {resSuccessMessage}
                  </Alert>
               ) : (
                  ''
               )}
               <div className="row">
                  <div className="col-md-4 d-md-block d-none">
                     <ProfileCard />
                  </div>
                  <div className="col-md-8 col-12">
                     <div className="doughnut-createprofile">
                        <Doughnut
                           title="AED"
                           value={avalaibel_balance || 0}
                           footerTitle="Your available balance"
                           style={{ fontSize: '20px' }}
                        />
                        <Doughnut
                           color="#03DAC5"
                           value={avalaibel_dream_coin || 0}
                           footerTitle="Your available dream coins"
                           style={{ fontSize: '20px' }}
                        />
                     </div>

                     <div className="heading__create mt-3">
                        <H1Heading className="mt-3 d-md-block d-none">
                           Personal Details
                        </H1Heading>
                        <PButton onClick={() => onSubmit()} label="Update" />
                     </div>

                     <div className="mt-3">
                        {resShow ? (
                           <Alert
                              color="danger"
                              onClick={() => setResShow(false)}
                              dismissible
                           >
                              {resMessage}
                           </Alert>
                        ) : (
                           ''
                        )}
                        <div className="row">
                           <div className="col-md-6 col-12">
                              <TextField
                                 label="First Name"
                                 onChange={Fname}
                                 value={firstname}
                              />
                              <TextField
                                 label="Last Name"
                                 onChange={Lname}
                                 value={last_name}
                              />
                              <TextField
                                 label="Email"
                                 onChange={Email}
                                 value={email}
                              />
                              <CountryCodeField
                                 label="Country Code"
                                 callback={(e) => Phoneno(e)}
                                 value={phone}
                              />
                           </div>
                           <div className="col-md-6 col-12">
                              <div className="res1">
                                 <SelectField
                                    label="Nationality"
                                    options={[]}
                                 />
                                 {/* <Typeahead
                                 label="Nationality"
                                 labelKey="nationality"
                                 onChange={(selected) => {
                                    setnationality(selected);
                                    console.log(selected);
                                 }}
                                 options={nationalites}
                                 placeholder="Nationality"
                                 style={{}}
                                 selected={nationality}
                                 inputProps={{
                                    className: 'my-custom-classname',
                                    style: {
                                       height: 'calc(1.5em + 1.75rem + 2px)',
                                    },
                                 }}
                              /> */}
                              </div>
                              <div className="res2">
                                 <SelectField
                                    label="Country of Residence"
                                    options={[]}
                                 />
                                 {/* <Typeahead
                                 label="Country of Residence"
                                 labelKey="nationality"
                                 placeHolders="Country of Residence"
                                 onChange={(selected) => {
                                    setcityResidence(selected);
                                    console.log(selected);
                                 }}
                                 options={nationalites}
                                 selected={city_residence}
                                 placeholder="Country of Residence"
                                 inputProps={{
                                    className: 'my-custom-classname',
                                    style: {
                                       height: 'calc(1.5em + 1.75rem + 2px)',
                                    },
                                 }}
                              /> */}
                              </div>
                              <div>
                                 <SelectField label="City" options={[]} />
                                 {/* <Typeahead
                                 id="noid"
                                 label="City"
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
                                       height: 'calc(1.5em + 1.75rem + 2px)',
                                    },
                                 }}
                              /> */}
                              </div>
                           </div>
                        </div>
                        <div className="text-center d-md-none d-block">
                           <PButton label="update" />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="d-md-block d-none">
                  <NewsLetter />
               </div>
            </div>
         </div>
         <div className="d-md-block d-none">
            <Footer />
         </div>
      </>
   );
};
