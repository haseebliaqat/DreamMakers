import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { purchasesService } from '@/_services/purchases.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [purchases, setPurchases] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["dreamCoinsUsed", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        purchasesService.getAll(obj).then((x) => {
            setTotalCount(x.count)
            setPurchases(x.rows)
        });
    }, []);

    function deletePurchase(id) {
        setPurchases(purchases.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        purchasesService.delete(id).then(() => {
            setPurchases(purchases => purchases.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Purchases</h1>
            <p>All Purchases from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Purchase</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dream Coins Used</th>
                        <th>Currency Used</th>
                        <th>Paid Amount</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {purchases && purchases.map(purchase =>
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.dreamCoinsUsed}</td>
                            <td>{purchase.currencyUsed}</td>
                            <td>{purchase.paidAmount}</td>
                            <td>{moment(purchase.createdDate).format("llll")}</td>
                            <td>{moment(purchase.updatedDate).format("llll")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${purchase.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deletePurchase(purchase.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={purchase.isDeleting}>
                                    {purchase.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!purchases &&
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