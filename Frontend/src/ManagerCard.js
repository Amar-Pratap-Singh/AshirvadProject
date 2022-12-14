import { React } from 'react';

function ManagerCard(props){

    return (
        <div class="card">
            <h5 class="card-header">Complaint ID: {props.complaintID}</h5>
            <div class="card-body">
                <h5 class="card-title">Raised By: {props.customerUsername}</h5>
                <h5 class="card-title">Status: {props.status}</h5>
                <p class="card-text">{props.complaint}</p>
            </div>
        </div>

    );
}

export default ManagerCard;
