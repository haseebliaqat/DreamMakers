import React from 'react';
import './SocialIcon.less';

import InstaImage from '@/_assets/images/insta-blue.png';
import TwitterImage from '@/_assets/images/twitter-blue.png';
import LinkedInImage from '@/_assets/images/linkedin-blue.png';
import { Paragraph } from '@/_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';

export const SocialIcon = () => {
   return (
      <>
         <Paragraph className="text-center mt-2" fontWeight="300">
            Follow Us On
         </Paragraph>
         <div className="d-flex align-items-start justify-content-center mt-2">
            <a href="#" className="social-icon text-center">
               <img src={LinkedInImage} alt="instagram" className="img-fluid" />
            </a>
            <a href="#" className="social-icon text-center">
               <img src={TwitterImage} alt="twitter" className="img-fluid" />
            </a>
            <a href="#" className="social-icon text-center">
               <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  className="svg-inline--fa fa-facebook-f"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  height="28"
                  width="28"
               >
                  <path
                     fill="#104A8E"
                     d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
               </svg>
            </a>
            <a href="#" className="social-icon text-center">
               <img src={InstaImage} alt="instagram" className="img-fluid" />
            </a>
         </div>
      </>
   );
};
