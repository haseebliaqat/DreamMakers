import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { couponsService } from '@/_services/coupons.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [coupons, setCoupons] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        couponsService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setCoupons(x.rows)
        });
    }, []);

    function deleteCoupon(id) {
        setCoupons(coupons.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        couponsService.delete(id).then(() => {
            setCoupons(coupons => coupons.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Coupons</h1>
            <p>All Coupons from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Coupons</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {coupons && coupons.map(coupon =>
                        <tr key={coupon.id}>
                            <td>{coupon.id}</td>
                            <td>{coupon.name}</td>
                            <td>{coupon.title}</td>
                            <td>{coupon.price}</td>
                            <td>{coupon.inStock}</td>
                            <td>{moment(coupon.created).format("llll")}</td>
                            <td>{moment(coupon.updated).format("llll")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${coupon.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCoupon(coupon.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={coupon.isDeleting}>
                                    {coupon.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!coupons &&
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