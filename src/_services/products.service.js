import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const productSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/products`;

export const productsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    product: productSubject.asObservable(),
    get productValue() { return productSubject.value }
};

function getAll(obj) {
    return fetchWrapper.post(baseUrl, obj);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(product => {
            // update stored user if the logged in user updated their own record
            if (product.id === productSubject.value.id) {
                // publish updated user to subscribers
                product = {...productSubject.value, ...product };
                productSubject.next(product);
            }
            return product;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === productSubject.value.id) {
                logout();
            }
            return x;
        });
}