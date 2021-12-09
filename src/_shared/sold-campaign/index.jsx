import React from 'react';
import './index.less';
import shareIcon from '@/_assets/images/social-share.png';
import bottle from '@/_assets/images/bottle.png';

function SoldCampaign() {

    return (
        <div className="card">

            <div className="card-img">

                <div className="overlay"></div>

                <div className="overlay-text">
                    <h3 >Sold Out</h3>
                </div>

                <div className="card-cnt">

                    <h1>Maldives Trip</h1>

                    <p>WIN FREE MALDIVES HOLIDAY TRIP</p>

                </div>

                <div className="btl-img">

                    <img src={bottle} alt="" />

                </div>

                <div className="card-icon">
                    <img src={shareIcon} alt="" />
                </div>

            </div>

            <div className="card-footer">

                <div>
                    <div >
                        <h6>Draw date</h6>
                        <h5 style={{fontWeight:"800"}}>13 August 2021</h5>
                    </div>

                </div>

            </div>

        </div>
    );
}

export { SoldCampaign };