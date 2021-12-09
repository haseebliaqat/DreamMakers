
import React, { useState, useEffect } from 'react';
import './winners.less';
import Slider from "react-slick";
import sliderImg from '@/_assets/images/sliderImg.png';
import sliderImg2 from '@/_assets/images/sliderImg2.png';
import sliderImg3 from '@/_assets/images/sliderImg3.png';
import sliderImg4 from '@/_assets/images/sliderImg4.png';
import sliderImg5 from '@/_assets/images/sliderImg5.png';
import winnerImg from '@/_assets/images/sky-dive.jpg';
import WinnerCard from '../../_shared/winner-card/winner-card';

function Winners() {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
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
    };

    return (
        <section className="winners-section">
            <div className="signUpSlider">
                <h1>Our Previous Winners</h1>
                <Slider {...settings}>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg})` }}></div>
                        {/* <img src={sliderImg} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg2})` }}></div>
                        {/* <img src={sliderImg2} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg3})` }}></div>
                        {/* <img src={sliderImg3} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg4})` }}></div>
                        {/* <img src={sliderImg4} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg5})` }}></div>
                        {/* <img src={sliderImg5} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg})` }}></div>
                        {/* <img src={sliderImg5} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg2})` }}></div>
                        {/* <img src={sliderImg5} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider-img" style={{ backgroundImage: `url(${sliderImg3})` }}></div>
                        {/* <img src={sliderImg5} /> */}
                        <div className="slide__caption">
                            <h3>Kate J.</h3>
                            <p>Won Sky diving at Abu Dhabi</p>
                        </div>
                    </div>
                </Slider>
            </div>

            <div className="all-winners">
                <h1>All Winners</h1>
                <div className="row">

                    <WinnerCard />
                    <WinnerCard />
                    <WinnerCard />
                    <WinnerCard />
                    <WinnerCard />
                    <WinnerCard />
                </div>

            </div>
        </section>
    );
}

export default Winners;