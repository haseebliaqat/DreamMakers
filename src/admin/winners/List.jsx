import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { winnersService } from '@/_services/winners.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [winners, setWinners] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        winnersService.getAll(obj).then((x) => {
            setTotalCount(x.count)
            setWinners(x.rows)
        });
    }, []);

    function deleteWinner(id) {
        setWinners(winners.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        winnersService.delete(id).then(() => {
            setWinners(winners => winners.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Winners</h1>
            <p>All Winners from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Winner</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Manufacturer</th>
                        <th>Country</th>
                        <th>Expiry</th>
                        <th>Price</th>
                        <th>Picture</th>
                        <th>In Stock</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {winners && winners.map(winner =>
                        <tr key={winner.id}>
                            <td>{winner.id}</td>
                            <td>{winner.name}</td>
                            <td>{winner.title}</td>
                            <td>{winner.company}</td>
                            <td>{winner.manufacturer}</td>
                            <td>{winner.country}</td>
                            <td>{winner.expiry}</td>
                            <td>{winner.price}</td>
                            <td>{winner.pictureId}</td>
                            <td>{winner.inStock}</td>
                            <td>{moment(winner.createdDate).format("llll")}</td>
                            <td>{moment(winner.updatedDate).format("llll")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${winner.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteWinner(winner.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={winner.isDeleting}>
                                    {winner.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!winners &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };