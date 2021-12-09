import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const purchaseSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/purchases`;

export const purchasesService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    purchase: purchaseSubject.asObservable(),
    get purchaseValue() { return purchaseSubject.value }
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
        .then(purchase => {
            // update stored user if the logged in user updated their own record
            if (purchaseSubject.value) {
                if (purchase.id === purchaseSubject.value.id) {
                    // publish updated user to subscribers
                    purchase = {...purchaseSubject.value, ...purchase };
                    purchaseSubject.next(purchase);
                }
            }
            return purchase;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (purchaseSubject.value) {
                if (id === purchaseSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}