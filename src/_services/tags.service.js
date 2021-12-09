import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const tagSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/tags`;

export const tagsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    tag: tagSubject.asObservable(),
    get tagValue() { return tagSubject.value }
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
        .then(tag => {
            // update stored user if the logged in user updated their own record
            if (!!tagSubject.value) {
                if (tag.id === tagSubject.value.id) {
                    // publish updated user to subscribers
                    tag = {...tagSubject.value, ...tag };
                    tagSubject.next(tag);
                }
            }
            return tag;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!tagSubject.value) {
                if (id === tagSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}