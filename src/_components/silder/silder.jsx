import React, { useEffect, useState } from 'react';
// import { accountService } from '@/_services';
import Slider from 'react-slick';
import bottle from '../../_assets/images/bottle.png';
import shareIcon from '../../_assets/images/social-share.png';
import arrowIcon from '../../_assets/images/arrow-icon.svg';
import { CampaignCard } from '@/_shared/campaign-card/index.jsx';
import { CounterMobile } from '@/_shared/counter-mobile';
import styled, { keyframes } from 'styled-components';
import { fadeOutUp } from 'react-animations';
import { Link } from 'react-router-dom';

const fadeOutUpAnimation = keyframes`${fadeOutUp}`;
const FadeOutUpDiv = styled.div`animation: 0.5s ${fadeOutUpAnimation};`;

function SilderComponent() {
    const [slideCounter, setSlideCounter] = useState('01');
    const [isPlaying, setIsPlaying] = useState(false);
    const [animateCounter, setAnimateCounter] = useState(true);
    const [soldCount, setSoldCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [randomPrice, setRandomPrice] = useState('720.00');


    let startCount = (id, value) => {
        let idNumber = id.split('-')[1];
        let el = document.getElementById(id);
        let childEl = el.children[1].children[1];
        let counterNumber = id.split('-')[1];

        if (counterNumber == 7) {
            setAnimateCounter(value);
            if (!value) {

                let current = 1;
                var startTime = new Date().getTime();
                let counter = setInterval(() => {
                    current++;

                    setSoldCount(current);
                    if (current === 20) {
                        setAnimateCounter(true);
                        clearInterval(counter);
                        return;
                    }
                }, 300);
            }
        }
    }

    let showPrice = (id) => {
        let price = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        setRandomPrice(price + ".00")
        if (id == 7) {
            setSoldCount(0);
        }
    }
    return (

        <section className="other sliderStyle1">

            <div className="container-fluid">

                {/* <h1 className="headingStyle1">You may be interested in</h1> */}

                <div className="card-head static-card-header" id="card-7" onClick={() => startCount("card-7", false)}>

                    <h1 className="headingStyle5 font-fancy">win</h1>

                    <CounterMobile soldCount={soldCount} keyvalue={randomPrice} />

                </div>



                <div className="other-compaigns container">

                    {(() => {

                        let settings = {
                            infinite: true,
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            autoplay: false,
                            // arrows: false,
                            nextArrow: <span className="arrow-next other-compaigns-arrow-next"><img src={arrowIcon} alt="" /></span>,
                            prevArrow: <span className="arrow-prev other-compaigns-arrow-prev"><img src={arrowIcon} alt="" /></span>,
                            dots: false,
                            responsive: [
                                {
                                    breakpoint: 1501,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1,
                                        arrows: true,
                                        // prevArrow: '.h-prev',
                                        // nextArrow: '.h-next',
                                        dots: false,
                                    }
                                },
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1,
                                        arrows: false,
                                        dots: false
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        slidesToShow: 1,
                                        centerMode: true,
                                        centerPadding: '10%',
                                        slidesToScroll: 1,
                                        arrows: false,
                                        // prevArrow: '.h-prev',
                                        // nextArrow: '.h-next',
                                        dots: false,
                                    }
                                }


                            ]
                        }

                        return (
                            <Slider {...settings} afterChange={() => showPrice("7")}>

                                <div>
                                    <CampaignCard />

                                </div>

                                <div>
                                    <CampaignCard />
                                </div>

                                <div>
                                    <CampaignCard />
                                </div>

                                <div>
                                    <CampaignCard />
                                </div>


                            </Slider>

                        );

                    })()}

                </div>



                <div className="card-footer static-card-footer" key={randomPrice}>

                    <div>

                        <div>

                            <p>Buy a water Bottle</p>

                            <FadeOutUpDiv>
                                <h3>AED {randomPrice}</h3>
                            </FadeOutUpDiv>

                        </div>

                        <Link className="buy-now" to={{ pathname: `/dream-cart` }}>
                            Buy now
                        </Link>

                    </div>

                    <p>Max draw date: December 02, 2021 or when the campaign <br />is sold out.Which ever is earlier.</p>

                </div>

                {/* <div className="load-btn">

                    <a href="#"><strong>+</strong> Load more</a>

                </div> */}

            </div>

        </section>
    )
}

export { SilderComponent };
