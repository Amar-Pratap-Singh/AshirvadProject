import { React } from 'react';

function HistoryCard(props){


    function eventHandlerCancel(){

        const id = props.id;

        const result = fetch("http://localhost:8080/CancelComplaint", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                complaintID: id 
            }),    
        }).then((res) => res.json());

        props.navigator("customer-dashboard", false);

    }

    function eventHandlerSubmitFeedback(){
        props.setComplaintID(props.id);
        props.navigator("submit-feedback", false);
    }

    return (
        <div class="card">
            <h5 class="card-header">Complaint ID: {props.id}</h5>
            <div class="card-body">
                <h5 class="card-title">Status: {props.status}</h5>
                <p class="card-text">{props.complaint}</p>
                {(props.status === "raised") ? 
                    <button onClick={eventHandlerCancel} class="btn btn-primary">Cancel Complaint</button> :
                    ((props.status === "executed") ? 
                        <button onClick={eventHandlerSubmitFeedback} class="btn btn-primary">Submit Feedback</button> :
                        ((props.status === "completed") ?
                            <button class="btn btn-primary" disabled>Feedback Submitted</button> : 
                            ((props.status === "cancelled") ? 
                                <></> : 
                                <button class="btn btn-primary" disabled>Submit Feedback</button>  
                            )
                        )
                    )
                }
            </div>
        </div>

    );
}

export default HistoryCard;
