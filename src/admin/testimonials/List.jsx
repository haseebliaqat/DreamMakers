import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testimonialsService } from '@/_services/testimonials.service';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [testimonials, setTestimonials] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        testimonialsService.getAll(obj).then((x) => {
            setTotalCount(x.count)
            setTestimonials(x.rows)
        });
    }, []);

    function deleteTestimonial(id) {
        setTestimonials(testimonials.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        testimonialsService.delete(id).then(() => {
            setTestimonials(testimonials => testimonials.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Testimonials</h1>
            <p>All Testimonials from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Testimonial</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Manufacturer</th>
                        <th>Country</th>
                        <th>Expiry</th>
                        <th>Price</th>
                        <th>Picture</th>
                        <th>In Stock</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials && testimonials.map(testimonial =>
                        <tr key={testimonial.id}>
                            <td>{testimonial.id}</td>
                            <td>{testimonial.name}</td>
                            <td>{testimonial.title}</td>
                            <td>{testimonial.company}</td>
                            <td>{testimonial.manufacturer}</td>
                            <td>{testimonial.country}</td>
                            <td>{testimonial.expiry}</td>
                            <td>{testimonial.price}</td>
                            <td>{testimonial.pictureId}</td>
                            <td>{testimonial.inStock}</td>
                            <td>{moment(testimonial.createdDate).format("llll")}</td>
                            <td>{moment(testimonial.updatedDate).format("llll")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${testimonial.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteTestimonial(testimonial.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={testimonial.isDeleting}>
                                    {testimonial.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!testimonials &&
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