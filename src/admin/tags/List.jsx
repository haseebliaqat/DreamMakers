import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tagsService } from '@/_services/tags.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [tags, setTags] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        tagsService.getAll(obj).then((x) => {
            setTotalCount(x.count)
            setTags(x.rows)
        });
    }, []);

    function deleteTag(id) {
        setTags(tags.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        tagsService.delete(id).then(() => {
            setTags(tags => tags.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Tags</h1>
            <p>All Tags from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Tag</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tags && tags.map(tag =>
                        <tr key={tag.id}>
                            <td>{tag.id}</td>
                            <td>{tag.name}</td>
                            <td>{tag.priority}</td>
                            <td>{tag.type}</td>
                            <td>{tag.status}</td>
                            <td>{moment(tag.startDate).format("llll")}</td>
                            <td>{moment(tag.endDate).format("llll")}</td>
                            <td>{moment(tag.createdDate).format("llll")}</td>
                            <td>{moment(tag.updatedDate).format("llll")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${tag.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteTag(tag.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={tag.isDeleting}>
                                    {tag.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!tags &&
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