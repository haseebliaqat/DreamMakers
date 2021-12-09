import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsService } from '@/_services/products.service';

function List({ match }) {
    const { path } = match;
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        productsService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setProducts(x.rows)
        });
    }, []);

    function deleteProduct(id) {
        setProducts(products.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        productsService.delete(id).then(() => {
            setProducts(product => product.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Products</h1>
            <p>All Products from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Products</Link>
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
                    {products && products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.title}</td>
                            <td>{product.company}</td>
                            <td>{product.manufacturer}</td>
                            <td>{product.country}</td>
                            <td>{product.expiry}</td>
                            <td>{product.price}</td>
                            <td>{product.picture}</td>
                            <td>{product.inStock}</td>
                            <td>{product.createdDate}</td>
                            <td>{product.updatedDate}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${product.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={product.isDeleting}>
                                    {product.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!products &&
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