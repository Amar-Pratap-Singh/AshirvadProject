import { React } from 'react';
import Navbar from './Navbar';

function Card(props){

    function nextPage(){
        props.setPageComplaintID(props.complaintID);
        props.setPageComplaintStatus(props.status);

        if (props.status === "accepted")
            props.navigator("page-2", true);
    
        else if (props.status === "visited")
            props.navigator("page-3", true);
        
        else if (props.status === "tobeExecuted")
            props.navigator("page-4", true);
        
        else if (props.status === "paused")
            props.navigator("page-5", true);
        
        else if (props.status === "executed")
            props.navigator("page-7", true);
        
        else if (props.status === "paid")
            props.navigator("page-6", true);
        
    }

    // function checkInvoice(){
    //     // const form = document.getElementById("");
    //     // form.addEventListener('submit', login);

    //     // async function login(event){
    //         // event.preventDefault();
    //     // }
    // }
        

    return (
        <div class="card">
            <h5 class="card-header">Complaint ID: {props.complaintID}</h5>
            <div class="card-body">
                <h5 class="card-title">Raised By: {props.customerUsername}</h5>
                <h5 class="card-title">Status: {props.status}</h5>
                <p class="card-text">{props.complaint}</p>
                {/* <button onClick={nextPage} class="btn btn-primary">Update Status</button> */}
                {(props.status !== "completed" && props.status !== "cancelled") ?
                    <button onClick={nextPage} class="btn btn-primary">Update Status</button> :
                    <button class="btn btn-secondary" disabled>Complaint Closed</button>
                }
            </div>
        </div>

    );
}

export default Card;
