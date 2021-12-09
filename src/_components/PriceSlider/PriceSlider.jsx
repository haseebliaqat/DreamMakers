import React from 'react'
import Slider from "react-slick";
// import { baseUrl } from "./config";
import './PriceSlider.less';
import sliderImg from '../../_assets/images/top-banner.svg';
import angleRight from '../../_assets/images/angle-double-right-solid.svg';
import angleLeft from '../../_assets/images/angle-double-left-solid.svg';

function PriceSlider() {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={sliderImg} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="SliderPrice">
      <div className="sliderSwipeBox">
        <div className="swipe">
          <div className="s-prev">
            <img src={angleLeft} />
          </div>
          <span className="m-block">
            Swipe for more
          </span>
          <div className="s-next">
            <img src={angleRight} />
          </div>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
          <div>
            <img src={sliderImg} />
          </div>
        </Slider>
      </div>

    </div>
  )
}
export { PriceSlider };
