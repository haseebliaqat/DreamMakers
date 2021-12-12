import React from 'react';
import './index.less';
import shareIcon from '@/_assets/images/social-share.png';
import bottle from '@/_assets/images/bottle.png';
import moment from 'moment';

function SoldCampaign({ props, videoSrc, item, keyValue }) {

    return (
        <div className="card">

            <div className="card-img" style={{ backgroundImage: `url(${item.prizeDesktopImage})`}}>

                <div className="overlay"></div>

                <div className="overlay-text">
                    <h3 >Sold Out</h3>
                </div>

                <div className="card-cnt">

                    <h1>{item.title}</h1>

                    <p>{item.prizeTitleDesktop}</p>

                </div>

                <div className="btl-img">

                    <img src={item.productImage} alt="" />

                </div>

                <div className="card-icon">
                    <img src={shareIcon} alt="" />
                </div>

            </div>

            <div className="card-footer">

                <div>
                    <div >
                        <h6>Draw date</h6>
                        <h5 style={{fontWeight:"800"}}> {moment(item?.drawDate).format("MMMM DD, YYYY")}</h5>
                    </div>

                </div>

            </div>

        </div>
    );
}

export { SoldCampaign };