import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { picturesService } from '@/_services/pictures.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [pictures, setPictures] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 25,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": {"id": { "$gt": 0 } }
        }
        picturesService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setPictures(x.rows)
        });
    }, []);

    function deletePicture(id) {
        setPictures(pictures.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        picturesService.delete(id).then(() => {
            setPictures(pictures => pictures.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Pictures</h1>
            <p>All Pictures from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Pictures</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Picture</th>
                        <th>ALT</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pictures && pictures.map(picture =>
                        <tr key={picture.id}>
                            <td>{picture.id}</td>
                            <td>{picture.name}</td>
                            <td>{picture.title}</td>
                            <td>{picture.description}</td>
                            <td><img src={picture.url} alt="" style={{width:'45px', height:'45px', borderRadius: '5px'}} /></td>
                            <td>{picture.alt}</td>
                            <td>{picture.type}</td>
                            <td>{picture.status}</td>
                            <td>{moment(picture.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(picture.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${picture.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deletePicture(picture.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={picture.isDeleting}>
                                    {picture.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!pictures &&
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