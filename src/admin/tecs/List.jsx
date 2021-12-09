import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tecsService } from '@/_services/tecs.service';
import { alertService } from '@/_services';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [tecs, setTecs] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["balance", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        tecsService.getAll(obj).then((x) => {
            setTotalCount(x.count)
            setTecs(x.rows)
        });
    }, []);

    function deleteTecs(id) {
        setTecs(tecs.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        tecsService.delete(id).then((resp) => {
            setTecs(tecs => tecs.filter(x => x.id !== id));
            alertService.success('Tec Deleted successfully', { keepAfterRouteChange: true });

        });
    }

    return (
        <div>
            <h1>Tecs</h1>
            <p>All Tecs from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Tec</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tecs && tecs.map(tec =>
                        <tr key={tec.id}>
                            <td>{tec.id}</td>
                            <td>{tec.name}</td>
                            <td>{moment(tec.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(tec.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${tec.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteTecs(tec.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={tec.isDeleting}>
                                    {tec.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!tecs &&
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