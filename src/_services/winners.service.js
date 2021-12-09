import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const winnerSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/winners`;

export const winnersService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    winner: winnerSubject.asObservable(),
    get winnerValue() { return winnerSubject.value }
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
        .then(winner => {
            // update stored user if the logged in user updated their own record
            if (!!winnerSubject.value) {
                if (winner.id === winnerSubject.value.id) {
                    // publish updated user to subscribers
                    winner = {...winnerSubject.value, ...winner };
                    winnerSubject.next(winner);
                }
            }
            return winner;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (!!winnerSubject.value) {
                if (id === winnerSubject.value.id) {
                    logout();
                }
            }
            return x;
        });
}