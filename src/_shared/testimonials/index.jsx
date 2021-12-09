import React, { useState } from 'react';
import './index.less';
import dummyVideo from '@/_assets/images/dummy-video.mp4';
import playIcon from '@/_assets/images/play-solid.svg';
import pauseIcon from '@/_assets/images/pause-solid.svg';
import qouteIcon from '@/_assets/images/quote-left-solid.svg';

function Testimonials({ key }) {

    const [isPlaying1, setIsPlaying1] = useState(false);
    const [isPlaying2, setIsPlaying1] = useState(false);
    const [isPlaying3, setIsPlaying3] = useState(false);
    const [isPlaying4, setIsPlaying4] = useState(false);
    const [isPlaying5, setIsPlaying5] = useState(false);

    let playVideo = (id) => {
        let number = id.split('-')[2];
        let video = document.getElementById(id);

        if (number == 1) {
            if (video.paused) {
                setIsPlaying1(true);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.play();
            } else {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.pause();
            }
        }
        else if (number == 2) {
            if (video.paused) {
                setIsPlaying1(false);
                setIsPlaying2(true);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.play();
            } else {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.pause();
            }
        }
        else if (number == 3) {
            if (video.paused) {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(true);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.play();
            } else {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.pause();
            }
        }
        else if (number == 4) {
            if (video.paused) {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(true);
                setIsPlaying5(false);
                video.play();
            } else {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.pause();
            }
        }
        else if (number == 5) {
            if (video.paused) {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(true);
                video.play();
            } else {
                setIsPlaying1(false);
                setIsPlaying2(false);
                setIsPlaying3(false);
                setIsPlaying4(false);
                setIsPlaying5(false);
                video.pause();
            }
        }


    }

    let randomNumber = () => {
        let price = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        return price;
    }

    return (
        <div className="testimonial" key={key}>

            <h5 className="text-center">Won Free Trips to Maldives</h5>

            <div className="testimonial-img testimonial-video">

                <button className="testimonialVideoPlayBtn custom-video-play-btn" onClick={() => playVideo(`testimonial-video-${key}`)} data-play-video="#testimonial-video-1">
                    {isPlaying1 ?
                        <img src={pauseIcon} alt="video play button icon" className="pause" />
                        :
                        <img src={playIcon} alt="video play button icon" className="play" />
                    }
                </button>


                <video loop id="testimonial-video-1">

                    <source src={dummyVideo} play={!isPlaying1 ? "false" : "true"} type="video/mp4" />

                </video>

            </div>

            <div className="testimonial-cnt">

                <div className="quote">

                    <img src={qouteIcon} alt="" />

                </div>

                <p>DREAM MAKERS you <br />guys are the best!<br /> You guys changed <br /> my life.</p>

                <p>Peter Madison</p>

                <p>PRO Driver in Dubai</p>

            </div>

        </div>
    );
}

export { Testimonials };