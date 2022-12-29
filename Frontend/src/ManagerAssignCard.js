import { React } from 'react';

function ManagerAssignCard(props){

    function handleClick(){

        const complaintID = props.complaintToAssign;
        const plumberUsername = props.plumberUsername;

        const result = fetch("http://localhost:8080/AssignComplaintToPlumber", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                complaintID,
                plumberUsername
            }),    
        }).then((res) => res.json());

        props.navigator('manager-dashboard', false);
    }

    return (
        <div class="card">
            <h5 class="card-header">Plumber Username: {props.plumberUsername}</h5>
            <div class="card-body">
                {/* <input name="ComplaintIdBox" type="textbox" placeholder='Complaint ID'></input> */}
                <button onClick={handleClick} class="btn btn-primary">Assign</button>
            </div>
        </div>

    );
}

export default ManagerAssignCard;
