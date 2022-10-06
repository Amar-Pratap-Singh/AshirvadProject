import React from 'react';

function ComplaintCard(props){

    function eventHandler(){
        alert(props.complaintID);
    }

    return(
        <div class="card">
            <h5 class="card-header">Complaint ID: {props.complaintID}</h5>
            <div class="card-body">
                <h5 class="card-title">Raised By: {props.customerUsername}</h5>
                <p class="card-text">{props.complaint}</p>
                <button onClick={eventHandler} class="btn btn-primary">Accept</button>
            </div>
        </div>
    );
}

export default ComplaintCard;