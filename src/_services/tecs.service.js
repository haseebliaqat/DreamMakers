import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';
const tecsSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/tecs`;

export const tecsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    tec: tecsSubject.asObservable(),
    get tecValue() { return tecsSubject.value }
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
        .then(tec => {
            // update stored user if the logged in user updated their own record
            if (tecsSubject.value) {
                if (tec.id === tecsSubject.value.id) {
                    // publish updated user to subscribers
                    tec = {...tecsSubject.value, ...tec };
                    tecsSubject.next(tec);
                }
            }
            return tec;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (tecsSubject.value) {
                if (id === tecsSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}