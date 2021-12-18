import React, { useEffect, useState } from 'react';
import './ActiveCoupons.less';

import { Card } from '@/_shared/card/card';
import { ProfileCard } from '@/_shared/profile-card/profile-card';
import { Doughnut } from '../../_shared/doughnut/doughnut';
import { H1Heading } from '../../_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';
import { NewsLetter } from '../../_shared/newsletter/newsletter';
import { ActiveCouponsCard } from './ActiveCouponsCard';
import { DownloadButton } from '../../_shared/DownloadButton/DownloadButton';
import { SubHeader } from '../../_components/SubHeader/SubHeader';
import { accountService, alertService } from '@/_services';
export const ActiveCoupons = () => {
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
         <div className="active-coupons-page">
            <div className="row">
               <div className="col-md-4 d-md-block">
                  <ProfileCard />
               </div>
               <div className="col-md-8 col-sm-12 p-md-2 p-0">
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
                  <div className="d-md-none d-block">
                     <SubHeader title="Your Active Coupons" />
                  </div>
                  <H1Heading className="mt-3 d-md-block d-none">
                     Your Active Coupons
                  </H1Heading>
                  <div className="couponcard-container">

                     <div className="row">
                        <div className="col-lg-6 col-md-12">
                           <div className="px-2 text-center coupon-card__container">
                              <ActiveCouponsCard />
                              <DownloadButton label="Download Receipt" />
                           </div>
                        </div>
                        <span className="border-card"></span>
                        <div className="col-lg-6 col-md-12">
                           <div className="px-2 text-center coupon-card__container--1">
                              <ActiveCouponsCard />
                              <DownloadButton label="Download Receipt" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <NewsLetter />
         </div>
      </div>
   );
};
