import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { charityPartnersService } from '@/_services/charity-partners.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [charityPartners, setCharityPartners] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        charityPartnersService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setCharityPartners(x.rows)
        });
    }, []);

    function deleteCharityPartner(id) {
        setCharityPartners(charityPartners.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        charityPartnersService.delete(id).then(() => {
            setCharityPartners(charityPartners => charityPartners.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Charity Partners</h1>
            <p>All Charity Partners from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Charity Partner</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th>Vision</th>
                        <th>Amount Raised</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {charityPartners && charityPartners.map(charityPartner =>
                        <tr key={charityPartner.id}>
                            <td>{charityPartner.id}</td>
                            <td>{charityPartner.name}</td>
                            <td>{charityPartner.description}</td>
                            <td>{charityPartner.country}</td>
                            <td>{charityPartner.vision}</td>
                            <td>{charityPartner.fundRaised}</td>
                            <td>{moment(charityPartner.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(charityPartner.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${charityPartner.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCharityPartner(charityPartner.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={charityPartner.isDeleting}>
                                    {charityPartner.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!charityPartners &&
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