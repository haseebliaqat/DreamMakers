import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recommendationsService } from '@/_services/recommendations.service';
import { alertService } from '@/_services';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [recommendations, setRecommendations] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        recommendationsService.getAll(obj).then((x) => {
            setTotalCount(x.count);
            setRecommendations(x.rows);
        });
    }, []);

    function deleteRecommendation(id) {
        setRecommendations(recommendations.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        recommendationsService.delete(id).then((resp) => {
            setRecommendations(recommendations => recommendations.filter(x => x.id !== id));
            alertService.success('Recommendation Deleted successfully', { keepAfterRouteChange: true });

        });
    }

    return (
        <div>
            <h1>Recommendations</h1>
            <p>All Recommendations from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Recommendation</Link>
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
                    {recommendations && recommendations.map(dreamcoin =>
                        <tr key={dreamcoin.id}>
                            <td>{dreamcoin.id}</td>
                            <td>{dreamcoin.name}</td>
                            <td>{moment(dreamcoin.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(dreamcoin.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${dreamcoin.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteRecommendation(dreamcoin.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={dreamcoin.isDeleting}>
                                    {dreamcoin.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!recommendations &&
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