import React from 'react';
import './apple-login-button.less';
import Apple from '@/_assets/images/apple-logo.png';

function AppleLoginButton({mblStyle}) {
    return (
        <div className={ `apple-btn ${mblStyle}` }>
            <span>
                <img src={Apple} style={{width:"26px",height:"20px"}} />
            </span>
            <p>Log In with Apple</p>
        </div>
    );
}

export { AppleLoginButton };