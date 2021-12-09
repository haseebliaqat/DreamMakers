import React, { useState } from 'react';
import { Paragraph } from '../../_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';
import { WinnerCoupon } from '../../pages/Winners/winners-list/WinnerCoupon';
import { AccordionItem } from './AccordionItem/AccordionItem';
import dummyVideo from '@/_assets/images/dummy-video.mp4';
import playIcon from '@/_assets/images/play-icon.svg';
import qouteIcon from '@/_assets/images/qoute-icon.svg';
import samplePic from '@/_assets/images/sample-pic-3.jpg';

const Accordion = ({ items, isWinners }) => {

   let isArrange = false;
   const [activeItem, setActiveItem] = useState(0);
   const [activeChildItem, setActiveChildItem] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);

   if (window.innerWidth < 992) {
      isArrange = true;
   }

   const activeItemHandler = (id) => {
      if (activeItem == id) {
         setActiveItem(null);
         setActiveChildItem(null);
      }
      else {
         setActiveItem(id);
         setActiveChildItem(null);
      }
      setIsPlaying(false);
   };

   const activeChildItemHandler = (id) => {
      if (activeChildItem == id) {
         setActiveChildItem(null);
      }
      else {
         setActiveChildItem(id);
      }
      setIsPlaying(false);
   };

   let playVideo = (id) => {
      let video = document.getElementById(id);
      if (video.paused) {
         setIsPlaying(true);
         video.setAttribute('controls', '');
         video.play();
      } else {
         setIsPlaying(false);
         video.removeAttribute('controls');
         video.pause();
      }
   }

   return (
      <div>
         {items &&
            items.map((item,index) => (
               <div key={item.total}>
                  <AccordionItem
                     title={item.created+" ("+item.total+" Winners)"}
                     iconHandler={() => {
                        activeItemHandler(item.total);
                     }}
                     showMinusIcon={item.total === activeItem}
                  />
                  {item.total === activeItem && (
                     <div className="ml-5">
                        {item.DATA.map((item) => (
                           <div key={item.id}>
                              <AccordionItem
                                 smallFont
                                 title={item.fullName +" | "+item.campaignTitle}
                                 iconHandler={() => {
                                    activeChildItemHandler(item.id);
                                 }}
                                 showMinusIcon={item.id === activeChildItem}
                              />
                              {activeChildItem === item.id && (

                                 <>
                                    {isWinners ?
                                       <div className="winners-experience">

                                          <div className="row">
                                             {!isArrange ?

                                                <div className="col-md-8 col-sm-12 m-none">
                                                   <div className="feature-video">

                                                      {!isPlaying ?
                                                         <button className="play-btn" onClick={() => playVideo(`trip-video-${item.id}`)} data-play-video={`#trip-video-${item.id}`}>
                                                            <img src={playIcon} alt="video play button icon" className="play" />
                                                         </button>
                                                         :
                                                         null}
                                                      <video className="trip-vid" id={`trip-video-${item.id}`}>
                                                         <source src={item.videoUrl} type="video/mp4" />
                                                      </video>
                                                   </div>
                                                </div>

                                                : null
                                             }

                                             <div className="col-md-4 col-sm-12">
                                                <div className="details">
                                                   <img src={item.picUrl} className="prof-img" alt="" />
                                                   <div className="text-box">
                                                      <img src={qouteIcon} className="qoute-icon" alt="" />
                                                      <div className="text-wrapper">
                                                         <p className="text">{item.comments}
                                                         </p>
                                                         <p className="user-name">{item.fullName}</p>
                                                         <small>{item.designation} in {item.country}</small>
                                                      </div>
                                                   </div>

                                                   {isArrange ?
                                                      <div className="feature-video m-block">

                                                         {!isPlaying ?
                                                            <button className="play-btn" onClick={() => playVideo(`trip-video-${item.id}`)} data-play-video={`#trip-video-${item.id}`}>
                                                               <img src={playIcon} alt="video play button icon" className="play" />
                                                            </button>
                                                            :
                                                            null}
                                                         <video className="trip-vid" id={`trip-video-${item.id}`}>
                                                            <source src={dummyVideo} type="video/mp4" />
                                                         </video>
                                                      </div>
                                                      :
                                                      null
                                                   }


                                                   <WinnerCoupon 
                                                   firstName={item.fullName}
                                                   WinningPrize={item.winningPrizeTitle}
                                                   CouponNumber={item.couponNumber}
                                                   CouponQRcode={item.qrCodeUrl}
                                                   CouponPurchasingDate={item.couponPurchaseDate}
                                                   
                                                   />

                                                </div>
                                             </div>
                                          </div>



                                       </div>
                                       :
                                       <Paragraph color="#3d70ab">
                                          {item.description}
                                       </Paragraph>
                                    }

                                 </>


                              )}
                           </div>
                        ))}
                     </div>
                  )
                  }
               </div >
            ))}
      </div >
   );
};

export default Accordion;
