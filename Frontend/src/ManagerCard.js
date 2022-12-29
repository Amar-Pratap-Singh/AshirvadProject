import { React } from 'react';
// import { Navigate } from 'react-router-dom';

function ManagerCard(props){

    function assignComplaintToPlumber(){
        props.setComplaintToAssign(props.complaintID);
        props.navigator('manager-dashboard', false);
    }

    return (
        <div>

            <div class="card">
                <h5 class="card-header">Complaint ID: {props.complaintID}</h5>
                <div class="card-body">
                    <h5 class="card-title">Raised By: {props.customerUsername}</h5>
                    <h5 class="card-title">Status: {props.status}</h5>
                    <p class="card-text">{props.complaint}</p>
                    {(props.status === "raised") ? <button class="btn btn-primary" onClick={assignComplaintToPlumber} name="assignComplaintToPlumber" type="submit">Assign</button> : <button class="btn btn-dark" disabled>Assign</button>}
                </div>
            </div>

            {/* <form name="formComplaintAssignment">
            </form> */}

        </div>
    );
}

export default ManagerCard;
