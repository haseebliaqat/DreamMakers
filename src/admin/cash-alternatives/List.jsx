import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cashAlternativesService } from '@/_services/cash-alternatives.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [cashAlts, setCashAlts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        cashAlternativesService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setCashAlts(x.rows)
        });
    }, []);

    function deleteCashAlt(id) {
        setCashAlts(cashAlts.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        cashAlternativesService.delete(id).then(() => {
            setCashAlts(cashAlts => cashAlts.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Cash Alternatives</h1>
            <p>All Cash Alternatives from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Cash Alternatives</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cashAlts && cashAlts.map(cashAlt =>
                        <tr key={cashAlt.id}>
                            <td>{cashAlt.id}</td>
                            <td>{cashAlt.name}</td>
                            <td>{cashAlt.title}</td>
                            <td>{cashAlt.description}</td>
                            <td>{cashAlt.value}</td>
                            <td>{moment(cashAlt.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(cashAlt.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${cashAlt.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCashAlt(cashAlt.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={cashAlt.isDeleting}>
                                    {cashAlt.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!cashAlts &&
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