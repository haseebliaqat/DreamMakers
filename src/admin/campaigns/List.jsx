import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import moment from 'moment';
import { ActiveCouponsCardAdmin } from '@/pages/ActiveCoupons/ActiveCouponsCardAdmin';


function List({ match }) {
    const { path } = match;
    const [campaigns, setCampaigns] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [showCoupons, setShowCoupons] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState(0);

    useEffect(() => {
        let obj = {
            "limit": 50,
            "offset": 0,
            "order": [["id", "DESC"]],
            //"order": [["id", "ASC"], ["name", "DESC"]],
            "where": {"id": { "$gt": 0 } }
        }
        campaignsService.getAll(obj).then((x) => {
            console.log(x);
            setTotalCount(x.count)
            setCampaigns(x.rows)
        });
    }, []);

    function deleteCampaign(id) {
        setCampaigns(campaigns.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        campaignsService.delete(id).then(() => {
            setCampaigns(campaigns => campaigns.filter(x => x.id !== id));
        });
    }

    const downloadCoupons = (campaignId) => {
        setSelectedCampaignId(campaignId);
        setShowCoupons(true);
    }

    return (
        <div>
            <h1>Campaigns</h1>
            {showCoupons ? <ActiveCouponsCardAdmin campaignId={selectedCampaignId}></ActiveCouponsCardAdmin> : null }
            <p>All Campaigns from secure (admin only) api end point:</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Campaign</Link>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Total</th>
                        <th>Sold</th>
                        <th>/Entry Coup.</th>
                        <th>Price</th>
                        <th>Start</th>
                        <th>Draw</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Download Coupons</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns && campaigns.map(campaign =>
                        <tr key={campaign.id}>
                            <td>{campaign.id}</td>
                            <td>{campaign.name}</td>
                            <td>{campaign.title}</td>
                            <td>{campaign.code}</td>
                            <td>{campaign.status}</td>
                            <td>{campaign.type}</td>
                            <td>{campaign.totalCoupons}</td>
                            <td>{campaign.soldCoupons}</td>
                            <td>{campaign.perEntryCoupons}</td>
                            <td>{campaign.couponPrice}</td>
                            <td>{moment(campaign.startDate).format("llll")}</td>
                            <td>{moment(campaign.drawDate).format("llll")}</td>
                            <td>{moment(campaign.createdDate).format("llll")}</td>
                            <td>{moment(campaign.updatedDate).format("llll")}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${campaign.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCampaign(campaign.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={campaign.isDeleting}>
                                    {campaign.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                                <button className="btn btn-sm btn-success ml-1" onClick={ () => downloadCoupons(campaign.id)}>Download Coupons</button>
                            </td>
                        </tr>
                    )}
                    {!campaigns &&
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