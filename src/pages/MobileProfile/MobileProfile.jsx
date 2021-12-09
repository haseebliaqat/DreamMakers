import React from 'react';
import './MobileProfile.less';

import PaymentImage from '@/_assets/images/payment-opts.png';
import GroupLinksImage from '@/_assets/images/gouplinks-img.png';
import StoreIcons from '@/_assets/images/storeicon-img.png';
import DreamIcon from '@/_assets/icons/dream.png';
import TestimonialIcon from '@/_assets/icons/testimonial.png';
import WinnersIcon from '@/_assets/icons/winners.png';
import HowItWorksIcon from '@/_assets/icons/how-it-works.png';
import Banner from '@/_assets/images/user-profile-banner.png';
import UploadIcon from '@/_assets/icons/image-upload.svg';
import { Doughnut } from '@/_shared/doughnut/doughnut';
import { PROFILE_BUTTONS } from '@/_shared/profile-card/profile-card';
import { ProfileCardButton } from '@/_shared/ProfileCardButton/ProfileCardButton';

const TESTIMONIAL_BUTTONS = [
   { id: 1, image: DreamIcon, label: 'About Dream Makers' },
   { id: 2, image: TestimonialIcon, label: 'Testimonials' },
   { id: 3, image: WinnersIcon, label: 'Winners' },
   { id: 4, image: HowItWorksIcon, label: 'How it Works' },
];

function MobileProfile() {
   return (
      <div className="py-4 px-4">
         <div className="text-center">
            <img
               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
               alt="profile-img"
               className="mobile-profile-img"
            />
            <h2 className="m-profile-name mt-2">Hi Maria</h2>
            <button className="btn btn-primary mupload-btn">
               <span className="mx-2">
                  <img src={UploadIcon} alt="icon" />
               </span>
               <span>Upload Picture</span>
            </button>
         </div>
         <div className="d-flex justify-content-around my-2">
            <Doughnut
               title="AED"
               value="7.20"
               footerTitle="Your available dream coins"
            />
            <Doughnut
               color="#03DAC5"
               value="7.20"
               footerTitle="Your available dream coins"
            />
         </div>
         <div className="my-2">
            {PROFILE_BUTTONS.map((item) => (
               <ProfileCardButton
                  key={item.id}
                  leftIcon={item.image}
                  label={item.label}
               />
            ))}
         </div>

         <div className="my-2">
            <img src={Banner} alt="banner" className="w-100 h-100" />
         </div>
         <h4 className="testimonial-heading">General</h4>
         <div className="my-2">
            {TESTIMONIAL_BUTTONS.map((item) => (
               <ProfileCardButton
                  key={item.id}
                  leftIcon={item.image}
                  label={item.label}
               />
            ))}
         </div>
         <div className="text-center">
            <img src={StoreIcons} alt="store-icon" className="w-100 h-100" />
         </div>
         <div className="mt-3 px-2 d-flex align-items-center justify-content-between">
            <ul className="mprofile-links">
               <li className="mprofile-links__item">User Agreement</li>
               <li className="mprofile-links__item">Draw Terms & Conditions</li>
               <li className="mprofile-links__item">Privacy Policy</li>
               <li className="mprofile-links__item">
                  Frequently Asked Questions
               </li>
            </ul>
            <img src={GroupLinksImage} alt="group-links" />
         </div>
         <div class="text-center mt-5">
            <span class="footer-accept">We accept</span>
            <img src={PaymentImage} alt="payment-opt" className="img-fluid" />
         </div>
         <p class="text-center footer-para">
            Dream Makers Dubai © 2021. All rights reserved.
         </p>
      </div>
   );
};

export { MobileProfile };