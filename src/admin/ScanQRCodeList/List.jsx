import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { campaignsService } from '@/_services/campaigns.service';
import moment from 'moment';
import styled from 'styled-components'
import './campaign.css'
import {
	Checkbox,
	FormControlLabel,
	Table,
	TableBody,
	TableRow
} from "@material-ui/core";
function List({ history, match }) {
    const { path } = match;
    const [campaigns, setCampaigns] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
	const [checkedState, setChekcedState] = useState([]);
    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
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
	const handleChange = (e) => {
		const { checked, name } = e.target;
		if (checked) {
			setChekcedState((oldState) => [...oldState, parseInt(name)]);
		} else {
			setChekcedState((oldState) => oldState.filter((item) => item !== parseInt(name)));
		}
	};

    const GoLive=()=>{
        if(checkedState!=""){
            localStorage.setItem("Selected_go_live_campaigns",null)
            localStorage.setItem("Selected_go_live_campaigns",JSON.stringify(checkedState))
            history.push('/InvitationCode');
        }else{
            alert("Please select at least one campaign")
        }


    }
    return (
        console.log(checkedState),
        <div>
            <h1 className="header">Sold out Campaigns</h1>
            {/* <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Campaign</Link> */}
            <div style={{display:"flex", justifyContent:"flex-end", width:"100%", padding:"0",marginTop:"13px"}} >
                {/* <button className="live-draw" onclick="window.location.href='/page2'">LiveDraw       <span className="dot"></span></button> */}
            <p><Link><button  className="live-draw" onClick={GoLive}>Go Live <span className="dot"></span></button></Link></p>
            </div>
            
            <div className="container">
            <Table id="customers" style={{width:"80%"}}>
                <thead>
                    <tr>
                        <th>Campaign Name</th>
                        <th>Total Enteries</th>
                        <th>Draw Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {campaigns.map((item) => (
						<tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.soldCoupons}</td>
                            <td width="50%">{moment(item.drawDate).format("llll")}</td>
                            <td>
                            <Checkbox
								onChange={handleChange}
								checked={checkedState.includes((item.id))}
								name={(item.id)}
							/>
                            </td>
							
						</tr>
					))}
                </tbody>
            </Table>
                </div>
        </div>
    );
}

export { List };