import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const recommendationSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/recommendations`;

export const recommendationsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    recommendation: recommendationSubject.asObservable(),
    get recommendationValue() { return recommendationSubject.value }
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
        .then(recommendation => {
            // update stored user if the logged in user updated their own record
            if (recommendationSubject.value) {
                if (recommendation.id === recommendationSubject.value.id) {
                    // publish updated user to subscribers
                    recommendation = {...recommendationSubject.value, ...recommendation };
                    recommendationSubject.next(recommendation);
                }
            }
            return recommendation;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (recommendationSubject.value) {
                if (id === recommendationSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}