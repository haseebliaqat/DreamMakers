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
            "limit": 100,
            "offset": 0,
            "order": [["created", "DESC"]],
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
                        <th>Amount</th>
                        <th>amountWithoutTax</th>
                        <th>paidByCard</th>
                        <th>paidByDreamCoins</th>
                        <th>paidByDiscountCode</th>
                        <th>transactionFee</th>
                        <th>status</th>
                        <th>productName</th>
                        <th>quantity</th>
                        <th>unitPrice</th>
                        <th>accountId </th>
                        <th>Payment Type</th>
                        <th>Card Type</th>
                        <th>Campaign Name</th>
                        <th>Campaign Number</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {purchases && purchases.map(purchase =>
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.amount}</td>
                            <td>{purchase.amountWithoutTax}</td>
                            <td>{purchase.paidByCard}</td>
                            <td>{purchase.paidByDreamCoins}</td>
                            <td>{purchase.paidByDiscountCode}</td>
                            <td>{purchase.transactionFee}</td>
                            <td>{purchase.status}</td>
                            <td>{purchase.productName}</td>
                            <td>{purchase.quantity}</td>
                            <td>{purchase.unitPrice}</td>
                            <td>{purchase.account.email}</td>
                            <td>{purchase.typeOfPayment}</td>
                            <td>{purchase.payemntInstrumentType}</td>
                            <td>{purchase.campaignName}</td>
                            <td>{purchase.campaignNumber}</td>
                            <td style={{width:'10%'}}>{moment(purchase.created).format("llll")}</td>
                            <td>{ purchase.updated ? moment(purchase.updated).format("llll"): null}</td>
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