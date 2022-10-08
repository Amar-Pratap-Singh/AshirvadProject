import React from 'react';

function ComplaintCard(props){

    function eventHandler(){
        alert("Accepted Complaint with Complaint ID: " + props.complaintID);
        
        const updatedComplaints = props.complaints.filter((_, i) => i !== props.index);
        const updatedComplaintIDs = props.complaintIDs.filter((_, i) => i !== props.index);
        
        const complaintID = props.complaintID;
        const plumberUsername = props.plumberUsername;
        
        const result = fetch("http://localhost:8080/AcceptComplaint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                complaintID,
                plumberUsername,
                updatedComplaintIDs
            })
        }).then((res) => res.json());
        
        console.log(result.status);
        props.setComplaints(updatedComplaints);
        props.setComplaintIDs(updatedComplaintIDs);
        
        
        console.log(updatedComplaintIDs);
        console.log(props.complaintIDs);
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