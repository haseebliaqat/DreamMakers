import React, { useState, useEffect } from 'react';
import './checkout.less';
import checkedIcon from '@/_assets/images/checked-icon.svg';
import unCheckedIcon from '@/_assets/images/unchecked-icon.svg';
import { NewsLetter } from '../../_shared/newsletter/newsletter';
import Billing from './billing/billing';
import Information from './information/information';
import Payment from './payment/payment';
import Confirmation from './confirmation/confirmation';

function Checkout() {

    const [isBilling, setIsBilling] = useState(true);
    const [isInfo, setIsInfo] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    return (
        <section className="checkout-container container-fluid p-0">

            <div className="top-banner">
                <h3>Dream Cart</h3>
                <div className="breadcrumbs-box">
                    <div className="bread-item">
                        <img src={isBilling ? checkedIcon : unCheckedIcon} />
                        <p>Billing</p>
                    </div>
                    <div className="separator-line"></div>
                    <div className="bread-item">
                        <img src={isInfo ? checkedIcon : unCheckedIcon} />
                        <p>Information</p>
                    </div>
                    <div className="separator-line"></div>
                    <div className="bread-item">
                        <img src={isPayment ? checkedIcon : unCheckedIcon} />
                        <p>Payment</p>
                    </div>
                    <div className="separator-line"></div>
                    <div className="bread-item">
                        <img src={isConfirm ? checkedIcon : unCheckedIcon} />
                        <p>Confirmation</p>
                    </div>
                </div>
            </div>

            <div className="container">

                {isBilling ?
                    <Billing />
                    :
                    isInfo ?
                        <Information />
                        :
                        isPayment ?
                            <Payment />
                            :
                            isConfirm ?
                                <Confirmation />
                                :
                                null
                }



                <NewsLetter />

            </div>



        </section>


    );
}

export default Checkout;