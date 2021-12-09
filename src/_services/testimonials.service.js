import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const testimonialSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/testimonials`;

export const testimonialsService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    testimonial: testimonialSubject.asObservable(),
    get testimonialValue() { return testimonialSubject.value }
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
        .then(testimonial => {
            // update stored user if the logged in user updated their own record
            if (!!testimonialSubject.value) {
                if (testimonial.id === testimonialSubject.value.id) {
                    // publish updated user to subscribers
                    testimonial = {...testimonialSubject.value, ...testimonial };
                    testimonialSubject.next(testimonial);
                }
            }
            return testimonial;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!testimonialSubject.value) {
                if (id === testimonialSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}