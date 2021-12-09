import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const popupSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/popups`;

export const popupService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    popup: popupSubject.asObservable(),
    get popupValue() { return popupSubject.value }
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
        .then(popup => {
            // update stored user if the logged in user updated their own record
            if (popupSubject.value) {
                if (popup.id === popupSubject.value.id) {
                    // publish updated user to subscribers
                    popup = {...popupSubject.value, ...popup };
                    popupSubject.next(popup);
                }
            }
            return popup;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (popupSubject.value) {
                if (id === popupSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}