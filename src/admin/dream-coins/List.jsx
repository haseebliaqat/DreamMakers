import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dreamCoinsService } from '@/_services/dream-coins.service';
import { alertService } from '@/_services';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [dreamcoins, setDreamcoins] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["balance", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        dreamCoinsService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setDreamcoins(x.rows)
        });
    }, []);

    function deleteDreamcoin(id) {
        setDreamcoins(dreamcoins.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        dreamCoinsService.delete(id).then((resp) => {
            console.log("resp", resp);
            setDreamcoins(dreamcoins => dreamcoins.filter(x => x.id !== id));
            alertService.success('Dream Coin Deleted successfully', { keepAfterRouteChange: true });

        });
    }

    return (
        <div>
            <h1>Dream Coins</h1>
            <p>All Dream Coins from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Dream Coin</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Balance</th>
                        {/* <th>Currency Value</th> */}
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dreamcoins && dreamcoins.map(dreamcoin =>
                        <tr key={dreamcoin.id}>
                            <td>{dreamcoin.id}</td>
                            <td>{dreamcoin.balance}</td>
                            {/* <td>{dreamcoin.currencyValue}</td> */}
                            <td>{moment(dreamcoin.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(dreamcoin.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${dreamcoin.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteDreamcoin(dreamcoin.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={dreamcoin.isDeleting}>
                                    {dreamcoin.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!dreamcoins &&
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