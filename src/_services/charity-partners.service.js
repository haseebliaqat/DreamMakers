import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';
const charityPartnerSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/charitypartners`;

export const charityPartnersService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    charityPartner: charityPartnerSubject.asObservable(),
    get charityPartnerValue() { return charityPartnerSubject.value }
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
        .then(charityPartner => {
            // update stored user if the logged in user updated their own record
            if (!!charityPartnerSubject.value) {
                if (charityPartner.id === charityPartnerSubject.value.id) {
                    // publish updated user to subscribers
                    charityPartner = {...charityPartnerSubject.value, ...charityPartner };
                    charityPartnerSubject.next(charityPartner);
                }
            }
            return charityPartner;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!charityPartnerSubject.value) {
                if (id === charityPartnerSubject.value.id) {
                    logout();
                }
            }

            return x;
        });
}