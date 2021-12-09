import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const couponSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/coupons`;

export const couponsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    coupon: couponSubject.asObservable(),
    get couponValue() { return couponSubject.value }
};

function getAll(obj) {
    return fetchWrapper.post(baseUrl, obj);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(coupon => {
            // update stored user if the logged in user updated their own record
            if (!!couponSubject.value) {
                if (coupon.id === couponSubject.value.id) {
                    // publish updated user to subscribers
                    coupon = {...couponSubject.value, ...coupon };
                    couponSubject.next(coupon);
                }
            }
            return coupon;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!couponSubject.value) {
                if (id === couponSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}