import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
function Overview({ match }) {
    const { path } = match;

    return (
        <div>
            <h1>Admin</h1> 
            <p>This section can only be accessed by administrators.</p>
            <div style={{display:"flex", justifyContent:"flex-end", width:"100%", padding:"0",}} >
                {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
            <p><Link to={`${path}/scan-qr-code-list`}><button  className="live-draw">Live Draw <span className="dot"></span></button></Link></p>
            </div>
            <p><Link to={`${path}/users`}>Manage Users</Link></p>
            <p><Link to={`${path}/campaigns`}>Manage Campaigns</Link></p>
            <p><Link to={`${path}/coupons`}>Manage Coupons</Link></p>
            <p><Link to={`${path}/products`}>Manage Products</Link></p>
            <p><Link to={`${path}/qr-codes`}>Manage QR Codes</Link></p>
            <p><Link to={`${path}/pictures`}>Manage Pictures</Link></p>
            <p><Link to={`${path}/cash-alternatives`}>Manage Cash Alternatives</Link></p>
            <p><Link to={`${path}/charity-partners`}>Manage Charity Partners</Link></p>
            <p><Link to={`${path}/dream-coins`}>Manage Dream Coins</Link></p>
            <p><Link to={`${path}/popups`}>Manage Popups</Link></p>
            <p><Link to={`${path}/purchases`}>Manage Purchases</Link></p>
            <p><Link to={`${path}/recommendations`}>Manage Recommendations</Link></p>
            <p><Link to={`${path}/tags`}>Manage Tags</Link></p>
            <p><Link to={`${path}/tecs`}>Manage Tecs</Link></p>
            <p><Link to={`${path}/testimonials`}>Manage Testimonials</Link></p>
            <p><Link to={`${path}/winners`}>Manage Winners</Link></p>
            <p><Link to={`${path}/scan-qr-code`}>Scan QR Code</Link></p>
            <p><Link to={`${path}/scan-qr-code-list`}>Scan QR Code List</Link></p>
        </div>
    );
}

export { Overview };