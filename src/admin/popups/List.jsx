import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { popupService } from '@/_services/popups.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [popups, setPopups] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": {"id": { "$gt": 0 } }
        }
        popupService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setPopups(x.rows)
        });
    }, []);

    function deletePopup(id) {
        setPopups(popups.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        popupService.delete(id).then(() => {
            setPopups(popups => popups.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Popups</h1>
            <p>All Popups from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Popup</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Hightlights</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {popups && popups.map(popup =>
                        <tr key={popup.id}>
                            <td>{popup.id}</td>
                            <td>{popup.name}</td>
                            <td>{popup.title}</td>
                            <td>{popup.description}</td>
                            <td>{popup.highlights}</td>
                            <td>{popup.link}</td>
                            <td>{popup.status}</td>
                            <td>{moment(popup.startDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(popup.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(popup.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${popup.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deletePopup(popup.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={popup.isDeleting}>
                                    {popup.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!popups &&
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