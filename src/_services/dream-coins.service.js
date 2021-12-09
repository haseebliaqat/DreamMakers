import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';
const dreamcoinSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/dreamcoins`;

export const dreamCoinsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    dreamcoin: dreamcoinSubject.asObservable(),
    get dreamcoinValue() { return dreamcoinSubject.value }
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
        .then(dreamcoin => {
            // update stored user if the logged in user updated their own record
            if (dreamcoinSubject.value) {
                if (dreamcoin.id === dreamcoinSubject.value.id) {
                    // publish updated user to subscribers
                    dreamcoin = {...dreamcoinSubject.value, ...dreamcoin };
                    dreamcoinSubject.next(dreamcoin);
                }
            }
            return dreamcoin;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (dreamcoinSubject.value) {
                if (id === dreamcoinSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}