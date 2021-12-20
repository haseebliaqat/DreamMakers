import React, { useState, useEffect } from 'react';
import './profile.less';

import { Card } from '@/_shared/card/card';
import { ProfileCard } from '@/_shared/profile-card/profile-card';
import { Footer } from '@/_components/Footer/Footer';
import { Doughnut } from '../../_shared/doughnut/doughnut';
import { accountService, alertService } from '@/_services';
import {
   H1Heading,
   H5Heading,
} from '../../_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';
import { NewsLetter } from '../../_shared/newsletter/newsletter';
import { DonationCard } from '../../_shared/DonationCard/DonationCard';
import { MobileProfile } from '../../components/MobileProfile/MobileProfile';

export const Profile = () => {
   const [avalaibel_dream_coin, setAvalaibleDreamCoins] = useState(null);
   const [avalaibel_balance, setAvalaibleBalance] = useState(null);
   const [funds, setFunds] = useState(null);
   // let helpedRaised=2000;
   // helpedRaised=helpedRaised+avalaibel_dream_coin;
   // helpedRaised= (helpedRaised).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
   // console.log("avalaibel_dream_coin",avalaibel_dream_coin);

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

      accountService
         .CharityFunds()
         .then((resp) => {
            var myJson = resp.rows;
            setFunds(myJson[0].fundRaised);
         })
         .catch((error) => {
            alertService.error('Internal Server Error');
         });
   };

   useEffect(() => {
      GetAllWinners();
   }, []);

   return (
      <>
         <div className="container-fluid overflow-x-hidden d-md-block d-none">
            <div className="profile-page">
               <div className="row">
                  <div className="col-md-4 d-md-block">
                     <ProfileCard />
                  </div>
                  <div className="col-md-8 col-sm-12 p-md-2 p-0">
                     <div className="doughnut-container">
                        <Doughnut
                           title="AED"
                           value={avalaibel_balance ? avalaibel_balance : 0}
                           footerTitle="Your available balance"
                           style={{ fontSize: '20px' }}
                        />
                        <Doughnut
                           color="#03DAC5"
                           value={
                              avalaibel_dream_coin ? avalaibel_dream_coin : 0
                           }
                           footerTitle="Your available dream coins"
                           style={{ fontSize: '20px' }}
                        />
                     </div>
                     <section className="donation-section container-fluid">
                        <div className="row">
                           <div className="col-md-8">
                              <div className="d-md-block d-none">
                                 <H1Heading fontSize="2px">
                                    Your Donations
                                 </H1Heading>
                              </div>
                              <div className="p-md-0 p-2">
                                 <DonationCard
                                    title="Helped built School in Africa"
                                    subTitle="Raised 1 million AED"
                                 />
                                 <DonationCard
                                    title="Helped built School in Africa"
                                    subTitle="Raised 1 million AED"
                                 />
                              </div>
                           </div>
                           <div className="col-md-4">
                              <Card className="mt-3 d-md-block d-none">
                                 <div className="helped-raise">
                                    <H5Heading fontWeight="400">
                                       You have helped raise
                                    </H5Heading>
                                    <H5Heading fontWeight="400" color="#edb200">
                                       AED
                                    </H5Heading>
                                    <H1Heading
                                       fontSize="40"
                                       fontWeight="500"
                                       color="#edb200"
                                    >
                                       {funds}
                                    </H1Heading>
                                 </div>
                              </Card>
                           </div>
                        </div>
                     </section>
                  </div>
               </div>
               <NewsLetter />
            </div>
         </div>
         <div className="d-md-block d-none">
            <Footer />
         </div>
         <div className="d-md-none d-block">
            <MobileProfile
               availableBalance={avalaibel_balance}
               availableDreamCoin={avalaibel_dream_coin}
            />
         </div>
      </>
   );
};
