import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';
const picturesSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/pictures`;

export const picturesService = {
    getAll,
    getById,
    create,
    update,
    createBulk,
    delete: _delete,
    picture: picturesSubject.asObservable(),
    get campaignValue() { return picturesSubject.value }
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

function createBulk(params) {
    return fetchWrapper.post(`${baseUrl}/bulk-create`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(picture => {
            // update stored user if the logged in user updated their own record
            if (!!picturesSubject.value) {
                if (picture.id === picturesSubject.value.id) {
                    // publish updated user to subscribers
                    picture = {...picturesSubject.value, ...picture };
                    picturesSubject.next(picture);
                }
            }
            return picture;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!picturesSubject.value) {
                if (id === picturesSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}