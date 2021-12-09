import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav, Alert  } from '@/_components';
import { Campaigns } from './campaigns/Index';
import { SacanQRCodeList } from './ScanQRCodeList/Index';
import { Coupons } from './coupons/Index';
import { Products } from './products/Index';
import { QRCodes } from './qr-codes/Index';
import { Pictures } from './pictures/Index';
import { Popups } from './popups/Index';
import { Purchases } from './purchases/Index';
import { Recommendations } from './recommendations/Index';
import { Tags } from './tags/Index';
import { Tecs } from './tecs/Index';
import { Testimonials } from './testimonials/Index';
import { Winners } from './winners/Index';
import { CashAlternatives } from './cash-alternatives/Index';
import { CharityPartners } from './charity-partners/Index';
import { DreamCoins } from './dream-coins/Index';
import { Overview } from './Overview';
import { Users } from './users';
import { Profile } from './profile/Index';
import { QrCodeScanner } from './scan-qrcode/QrCodeScanner';

function Admin({ match }) {
    const { path } = match;
    return (
        <div className="">
            <Nav />
            <Alert />
            <div className="container">
                
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/users`} component={Users} />
                    <Route path={`${path}/campaigns`} component={Campaigns} />
                    <Route path={`${path}/coupons`} component={Coupons} />
                    <Route path={`${path}/products`} component={Products} />
                    <Route path={`${path}/qr-codes`} component={QRCodes} />
                    <Route path={`${path}/pictures`} component={Pictures} />
                    <Route path={`${path}/cash-alternatives`} component={CashAlternatives} />
                    <Route path={`${path}/charity-partners`} component={CharityPartners} />
                    <Route path={`${path}/dream-coins`} component={DreamCoins} />
                    <Route path={`${path}/popups`} component={Popups} />
                    <Route path={`${path}/purchases`} component={Purchases} />
                    <Route path={`${path}/recommendations`} component={Recommendations} />
                    <Route path={`${path}/tags`} component={Tags} />
                    <Route path={`${path}/tecs`} component={Tecs} />
                    <Route path={`${path}/testimonials`} component={Testimonials} />
                    <Route path={`${path}/winners`} component={Winners} />
                    <Route path={`${path}/scan-qr-code-list`} component={SacanQRCodeList} />
                    <Route path={`${path}/scan-qr-code`} component={QrCodeScanner} />

                </Switch>
            </div>
        </div>
    );
}

export { Admin };