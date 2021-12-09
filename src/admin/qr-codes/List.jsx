import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { qrcodeService } from '@/_services/qrcodes.service';
import { alertService } from '@/_services';
import moment from 'moment';

function List({ match }) {
    const { path } = match;
    const [qrcodes, setQRCodes] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        qrcodeService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setQRCodes(x.rows)
        });
    }, []);

    function deleteQrCode(id) {
        setQRCodes(qrcodes.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        qrcodeService.delete(id).then((resp) => {
            console.log("resp", resp);
            if(resp.message == "qrCode deleted successfully"){
                setQRCodes(qrcodes => qrcodes.filter(x => x.id !== id));
                alertService.success('QR Code Deleted successfully', { keepAfterRouteChange: true });
            }
            else{
                alertService.success('Something went wrong.', { keepAfterRouteChange: true });
            }

        });
    }

    return (
        <div>
            <h1>QR Codes</h1>
            <p>All QR Codes from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add QR Codes</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {qrcodes && qrcodes.map(qrcode =>
                        <tr key={qrcode.id}>
                            <td>{qrcode.id}</td>
                            <td>{qrcode.name}</td>
                            <td>{qrcode.title}</td>
                            <td>{qrcode.price}</td>
                            <td>{qrcode.type}</td>
                            <td>{moment(qrcode.createdDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td>{moment(qrcode.updatedDate).format("DD-MM-YYYY HH:MM:SS A")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${qrcode.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteQrCode(qrcode.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={qrcode.isDeleting}>
                                    {qrcode.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!qrcodes &&
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