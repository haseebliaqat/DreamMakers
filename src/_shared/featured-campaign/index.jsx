import React, { useEffect, useState } from 'react';
import './index.less';
import shareIcon from '@/_assets/images/social-share.png';
import maldives from '@/_assets/images/four-seasons-landaa-giraavaru.png';
import bottle from '@/_assets/images/bottle.png';
import cashAlt from '@/_assets/images/cash-alt.svg';
import calendar from '@/_assets/images/calendar.svg'
import couponIcon from '@/_assets/images/coupon-icon.svg';
import playIcon from '@/_assets/images/play-solid.svg';
import dummyVideo from '@/_assets/images/dummy-video.mp4';
import { Counter } from '../../_shared/counter/index.jsx';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { sharedService } from '@/_services/shared.service';
import { constantSrv } from '@/_services/constant.service';
import _ from 'lodash';
import { useHistory } from "react-router-dom";
export function FeaturedCampaign({props, videoSrc, item, keyValue }) {
    const [animateCounter, setAnimateCounter] = useState(true);
    const [isPlaying1, setIsPlaying1] = useState(false);
    const [soldCount1, setSoldCount1] = useState(0);
    const [isLoader, setIsLoader] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [WinningDate, setWinningDate] = useState(false);
    const history = useHistory();
    
    function saveDataToLocalStorage(Campaign){
        console.log(JSON.stringify(Campaign));
        localStorage.setItem("SeletedCampaign",JSON.stringify(Campaign));
        const { from } = { from: { pathname: "/dream-cart" } };
        history.push(from);
    }
    function saveDataToLocalStorageByPrizeDetail(Campaign){
        console.log(JSON.stringify(Campaign));
        localStorage.setItem("SeletedCampaign",JSON.stringify(Campaign));
        const { from } = { from: { pathname: "/prize-details" } };
        history.push(from);
    }
    useEffect(() => {
        console.log(item.soldCoupons)
        window.scrollTo(0, 0)
        console.log("item==>", item);
        _.forEach(item.pictures, (p) => {
            if (p.type == constantSrv.EMediaCategory.prizeDesktop) {
                let extension = sharedService.getExtension(p.url);
                console.log("extension", extension);
                if (extension == "video") {
                    // alert()
                    setIsVideo(true);
                }
            }
        });
    }, [])

    let startCount = (id, value) => {
        let el = document.getElementById(id);
        let counterNumber = id.split('-')[1];

        if (counterNumber == 1) {
            setAnimateCounter(value);
            if (!value) {

                let current = 1;
                var startTime = new Date().getTime();
                let counter = setInterval(() => {
                    current++;

                    setSoldCount1(current);
                    if (current === 20) {
                        setAnimateCounter(true);
                        clearInterval(counter);
                        return;
                    }
                }, 20 / 4000);
            }
        }

    }

    let playVideo = (id) => {
        let number = id.split('-')[2];
        let video = document.getElementById(id);
        // stopVideo();

        if (number == 1) {
            if (video.paused) {
                video.setAttribute('controls', '');
                video.play();
                setIsPlaying1(true);
            } else {
                video.removeAttribute('controls');
                video.pause();
                setIsPlaying1(false);
            }
        }


    }

    let shareCampaign = () => {
        setIsLoader(true);
        let shareData = {
            title: 'Maldives Trip',
            text: 'Mesmerizing Maldives With Sun Island',
            url: "https://dreammakers.ae/prize-details"
        }
        const sharePromise = navigator.share(shareData);
        setIsLoader(false);
    }

    let renderMedia = (media, type) => {
        if (!!item.pictures) {
            let mediaUrl;
            _.forEach(item.pictures, (p) => {
                if (media == p.type) {
                    mediaUrl = p.url;
                }
            });
            return mediaUrl;
        }
    }

    return (
        <>
            <div className="win-card m-none" id="card-1" >
                {/* onClick={() => startCount("card-1", false)} key={keyValue} */}

                <p class="headingStyle2" style={{fontFamilyL:"28DaysLater"}}>win</p>
                <div className="bckg">

                    <div className="row">

                        <div className="col-sm-6">

                            <div className="image">

                                {isVideo ?
                                    <div className="feature-video">

                                        {!isPlaying1 ?
                                            <button className="testimonialVideoPlayBtn custom-video-play-btn" onClick={() => playVideo("feature-video-1")} data-play-video="#feature-video-1">
                                                <img src={playIcon} alt="video play button icon" className="play"  />
                                            </button>
                                            :
                                            null}

                                        <video id="feature-video-1" className="feature-vid-tag">
                                            <source src={renderMedia(constantSrv.EMediaCategory.prizeDesktop, 'video')} type="video/mp4" />
                                        </video>

                                    </div>
                                    :
                                    <img src={item?.prizeDesktopImage} alt="" />
                                }

                                {!isPlaying1 ?
                                    <div className="bottel-img">
                                        <img src={item?.productDesktopImage} alt="" />
                                    </div>
                                    :
                                    null
                                }


                            </div>

                        </div>

                        <div className="col-sm-6">

                            <div className="img-cnt">

                                <div className="title-box">
                                    <h1 className="headingStyle3">{item.title}</h1>
                                    <p className="paraStyle1">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="price-box">
                                    <p className="paraStyle2">{item.shortTitleDescriptionDesktop}</p>
                                    <h1 className="headingStyle4">AED {(item.couponPrice).toFixed(2)}</h1>
                                    <div className="btnStyle2">
                                        <button className="Buynow" onClick={(e) =>saveDataToLocalStorage(item)}>Buy now</button>
                                        {/* <Link to={{ pathname: `/dream-cart`}} >
                                        
                                            <span  onClick={(e) => saveDataToLocalStorage(item)}>Buy now</span>
                                        </Link>  */}
                                        {/* to={{ pathname: `/prize-details` }} */}
                                        <button className="Buynow" onClick={(e) =>saveDataToLocalStorageByPrizeDetail(item)}> Prize Details</button>
                                        {/* <Link to={{ pathname: `/prize-details` }}  >
                                            Prize Details
                                        </Link> */}
                                    </div>
                                </div>

                                <div className="bottom-box">
                                    <p className="paraStyle3">Max draw date: {moment(item.drawDate).format("MMMM DD, YYYY")} or <br />when the campaign is sold out. Which ever is earlier.</p>

                                    <div className="icon" onClick={shareCampaign}>
                                        {!isLoader ?
                                            <img src={shareIcon} />
                                            :
                                            <span className="spinner-border spinner-border-sm"></span>
                                        }
                                    </div>

                                    <div className="details-banner">

                                        <div className="misc-box">
                                            <span>
                                                <img src={couponIcon} alt="" />
                                                <small>{item.perEntryCoupons} tickets<br />per entry</small>
                                            </span>
                                            <span>
                                                <img src={cashAlt} alt="" />
                                                <small>cash alternative<br />available</small>
                                            </span>
                                            <span>
                                                <img src={calendar} alt="" />
                                                <small>{moment(item.startDate).format("MMM DD, HH:MM A")}</small>
                                            </span>
                                        </div>

                                        <p className="paraStyle3">In partnership with {item.charityPartnerId}</p>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <Counter soldCount={item.soldCoupons} totalCount={item.totalCoupons} keyValue={item.soldCoupons} />

                    {/* <div className="sold-counter" id="counter-1">
                        <Wave fill='#eabe00'
                            id=""
                            // paused={animateCounter}
                            options={{
                                height: soldCount1 === 0 ? 140 : 140 - (140 * (soldCount1 / 60)),
                                speed: 0.5,
                                points: 1
                            }}
                        />
                        <Wave fill='#ffcf00'
                            id=""
                            // paused={animateCounter}
                            options={{
                                height: soldCount1 === 0 ? 140 : 140 - (140 * (soldCount1 / 60)),
                                speed: 0.5,
                                points: 2
                            }}
                        />

                        <FadeOutUpDiv>
                            <span className="sold-cnt">{soldCount1}</span>
                        </FadeOutUpDiv>


                        <span className="text">Sold <br /> out of</span>

                        <span className="total-cnt">60</span>
                    </div> */}

                    {/* <div className="progress-box">

                        <span>1</span>

                        <span className="text">Sold <br /> out of</span>

                        <span>60</span>

                    </div> */}

                </div>

            </div>

        </>
    );

}

export const MemoizedFeaturedCampaign = React.memo(FeaturedCampaign);
// export { FeaturedCampaign };