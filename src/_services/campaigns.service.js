import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const campaignSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/campaigns`;

export const campaignsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    campaign: campaignSubject.asObservable(),
    get campaignValue() { return campaignSubject.value }
};

function getAll(obj) {
    return fetchWrapper.post(baseUrl, obj);
}

function getById(obj) {
    return fetchWrapper.post(baseUrl, obj);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(campaign => {
            // update stored user if the logged in user updated their own record
            if (!!campaignSubject.value) {
                if (campaign.id === campaignSubject.value.id) {
                    // publish updated user to subscribers
                    campaign = {...campaignSubject.value, ...campaign };
                    campaignSubject.next(campaign);
                }
            }

            return campaign;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!campaignSubject.value) {
                if (id === campaignSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}