import React, { useState, useEffect } from 'react';
import './winner-card.less';
import winnerImg from '@/_assets/images/sky-dive.jpg';

function WinnerCard() {
    return (
        <div className="col-md-4 col-sm-12">
            <div className="winner-card">
                <div className="winner-img" style={{ backgroundImage: `url(${winnerImg})` }}></div>
                <h3>Kate J.</h3>
                <p>Won Sky diving at Abu Dhabi</p>
            </div>
        </div>

    );
}

export default WinnerCard;