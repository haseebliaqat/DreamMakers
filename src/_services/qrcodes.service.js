import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const qrcodeSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/qrcodes`;

export const qrcodeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    qrcode: qrcodeSubject.asObservable(),
    get qrcodeValue() { return qrcodeSubject.value }
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
        .then(qrcode => {
            // update stored user if the logged in user updated their own record
            if (qrcodeSubject.value) {
                if (qrcode.id === qrcodeSubject.value.id) {
                    // publish updated user to subscribers
                    qrcode = {...qrcodeSubject.value, ...qrcode };
                    qrcodeSubject.next(qrcode);
                }
            }
            return qrcode;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (qrcodeSubject.value) {
                if (id === qrcodeSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}