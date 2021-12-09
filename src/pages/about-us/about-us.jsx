import React, { useState } from 'react';
import './about-us.less';
import { SubHeader } from '@/_components/SubHeader/SubHeader';

function AboutUs() {
    return (
        <section className="about-us">
            <SubHeader title="About Dream Makers" />
            <div className="container my-5">
                <p>
                    <span>Dream Makers</span> is owned and
                    operated by DMG Enterprises
                    General Trading LLC (hereinafter
                    referred to as “<span>Dream Makers</span>”). We
                    are a Dubai based company
                    incorporated in 2021 under the
                    Department of Economic
                    Development in Dubai.
                </p>

                <p>
                    Our mission is to provide people of
                    all walks of life the opportunity to
                    win the prize of their dreams at a
                    very affordable price. Our prizes
                    rage from holidays, houses, gold,
                    cars, electronics and lifestyle.
                </p>
                <p>
                    In addition to helping people realize
                    their dreams we also donate all
                    products purchased to charity so
                    not only do our customers benefit
                    but people less fortunate also
                </p>
            </div>
        </section>
    );
}

export default AboutUs;