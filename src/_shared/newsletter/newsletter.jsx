import React from 'react';
import './newsletter.less';

import AppBanner from '@/_assets/images/app-banner-1.svg';
import TopBanner from '@/_assets/images/top-banner-2.png';
import Heart from '@/_assets/images/heart.svg';

export const NewsLetter = () => {
   return (
      <div className="news-letter">
         <div className="my-4">
            <div className="row">
               <div className="col-md-6">
                  <img src={AppBanner} alt="banner-1" className="img-fluid" />
               </div>
               <div className="col-md-6">
                  <img src={AppBanner} alt="banner-2" className="img-fluid" />
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-md-6">
               <div className="news-letter__left">
                  <h5 className="news-letter__left-heading">
                     Get Benefits Communication Tips, <br />
                     eBooks & More!
                  </h5>
                  <div className="input-container">
                     <input type="email" className="news-letter__input" />
                     <label className="news-letter__input-label">
                        Email Address
                     </label>
                     <button className="news-letter__input-button">
                        Sign Up
                     </button>
                  </div>
               </div>
            </div>
            <div className="col-md-6">
               <div className="news-letter__right">
                  <div className="heart">
                     <img src={Heart} alt="" />
                  </div>

                  <div className="m-none">
                     <p className="news-letter__right-paragraph">
                        Thank you for playing Dream <br />
                        Game and raising money for our <br />
                        wonderful partner charities
                     </p>
                  </div>

                  <div className="m-block">
                     <p className="news-letter__right-paragraph">
                        Thank you for playing Dream Game and raising money for
                        our wonderful partner charities
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
