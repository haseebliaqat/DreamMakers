import React, { useState, useEffect } from 'react';
import './billing.less';
import bottle from '@/_assets/images/bottle.png';
import removeIcon from '@/_assets/images/bin-icon.svg';

function Billing() {

    const [quantity, setQuantity] = useState(1);

    let toggleQuantity = (type) => {
        let qty;
        if (quantity > 1) {
            if (type == 'minus') {
                qty = quantity - 1;
                setQuantity(qty);
            }
        }
        if (quantity >= 1) {
            if (type == 'plus') {
                qty = quantity + 1;
            setQuantity(qty);
            }
        }

    }

    return (
        <div className="billing-container">

            <div className="item-box">
                <div className="item-details">

                    <div className="item-info">
                        <h3>1.</h3>
                        <div className="item-misc">
                            <div className="details">
                                <img src={bottle} alt="" />

                                <div className="info-box">
                                    <h3>Maldives Trip</h3>
                                    <h4>Enter to Win</h4>

                                    <p className="text-1">You will receive <b>720 Dream Coins</b> for this</p>
                                    <p className="text-2">In Partnership with <b>ABC Tours</b></p>
                                    <small>
                                        <img src={removeIcon} alt="" />
                                        Remove
                                    </small>
                                </div>

                            </div>
                            <div className="note-text">
                                <p>Note: Every product you purchase will be donated and channeled through our partners<br />
                                    to help less fortunate.</p>
                            </div>
                        </div>
                    </div>
                    <div className="quantity-box">
                        <h3 className="price">AED 720</h3>
                        <div className="control-quantity">
                            <span className="minus" onClick={() => toggleQuantity('minus')}>-</span>
                            <h3>{quantity}</h3>
                            <span className="plus" onClick={() => toggleQuantity('plus')}>+</span>
                        </div>
                        <p>1 Purchase equals 1<br />
                            Entry
                        </p>
                    </div>

                </div>

                <div className="transaction-details">

                </div>

                <div className="total-price">

                </div>

            </div>

        </div>
    );
}

export default Billing;