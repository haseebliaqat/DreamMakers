import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}`;

export const accountService = {
    login,
    loginUsingGoogle,
    loginUsingFacebook,
    logout,
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    WinnerList,
    DiscountList,
    PurchaseCoupons,
    AvailabelBalance,
    updatePassword,
    updatePersonalDetail,
    updateProfilePicture,
    Testiminals,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value }
};

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/accounts/authenticate`, { email, password })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function loginUsingGoogle(email, firstName, lastName, imageUrl) {
    return fetchWrapper.post(`${baseUrl}/accounts/authenticate-using-google`, { email, firstName, lastName, imageUrl })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function loginUsingFacebook(email, firstName, lastName, imageUrl) {
    return fetchWrapper.post(`${baseUrl}/accounts/authenticate-using-google`, { email, firstName, lastName, imageUrl })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function loginUsingApple(email, firstName, lastName, imageUrl) {
    return fetchWrapper.post(`${baseUrl}/accounts/authenticate-using-google`, { email, firstName, lastName, imageUrl })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function WinnerList(obj) {
    return fetchWrapper.post(`${baseUrl}/Winners/get-by-dates`,obj)
        .then(res => {
            console.log(res);
            return res;
        });
}

function Testiminals(obj) {
    return fetchWrapper.post(`${baseUrl}/testimonials`,obj)
        .then(res => {
            console.log(res);
            return res;
        });
}

function DiscountList(obj) {
    return fetchWrapper.post(`${baseUrl}/discounts`,obj)
        .then(res => {
            console.log(res);
            return res;
        });
}
function AvailabelBalance(obj) {
    return fetchWrapper.post(`${baseUrl}/dreamcoins`,obj)
        .then(res => {
            console.log(res);
            return res;
        });
}

function PurchaseCoupons(discountCode,campaignId,actualPrice,discountAmount,dreamCoinsUsed,cashPaid,totalPurchasedCoupons,payment_token_id,type_of_payment,payemnt_instrument,payemnt_instrument_type,user_token) {
    return fetchWrapper.post(`${baseUrl}/coupons/buy-coupons`,{discountCode,campaignId,actualPrice,discountAmount,dreamCoinsUsed,cashPaid,totalPurchasedCoupons,payment_token_id,type_of_payment,payemnt_instrument,payemnt_instrument_type,user_token})
        .then(res => {
            console.log("res");
            console.log("set =>");
            console.log(res);
            return res;
        });
}





function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    userSubject.next(null);
    history.push('/home');
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}



function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
}
function updatePassword({ token, password, confirmPassword,accountID }) {
    
    return fetchWrapper.put(`${baseUrl}/accounts/${accountID}`, { token, password, confirmPassword })
    .then(resp => {
        userSubject.next(resp);
        return resp;
    });
    
}

function updatePersonalDetail({ firstName, lastName, email,mobileNumber,nationality,countryResidence,city,accountID }) {
    
    return fetchWrapper.put(`${baseUrl}/accounts/${accountID}`, { firstName, lastName, email,mobileNumber,nationality,countryResidence,city })
    .then(resp => {
        userSubject.next(resp);
        return resp;
    });
    
}

function updateProfilePicture({ picUrl,accountID }) {
    console.log("picUrl")
    console.log(picUrl)
    return fetchWrapper.put(`${baseUrl}/accounts/${accountID}`, {picUrl })
    .then(resp => {
        userSubject.next(resp);
        return resp;
    });
    
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/accounts/register`, params)
    .then(message => {

        console.log("message")
        console.log(message)
        // publish user to subscribers and start timer to refresh token
        userSubject.next(message);
        // startRefreshTokenTimer();
        return message;
    });
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = {...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    //const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    console.log("startRefreshTokenTimer")
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}