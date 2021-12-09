import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const cashAltSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/cashalternatives`;

export const cashAlternativesService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    cashAlt: cashAltSubject.asObservable(),
    get cashAltValue() { return cashAltSubject.value }
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
        .then(cashAlt => {
            // update stored user if the logged in user updated their own record
            if (!!cashAltSubject.value) {
                if (cashAlt.id === cashAltSubject.value.id) {
                    // publish updated user to subscribers
                    cashAlt = {...cashAltSubject.value, ...cashAlt };
                    cashAltSubject.next(cashAlt);
                }
            }
            return cashAlt;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!cashAltSubject.value) {
                if (id === cashAltSubject.value.id) {
                    logout();
                }
            }

            return x;
        });
}