import React from 'react';
import Navbar from '../Navbar';

function CustomerDashboard(props){
    
    function directRaiseComplaint(){

        const form = document.getElementById("dashboard");
        form.addEventListener('submit', raisingComplaint);

        async function raisingComplaint(event){
            event.preventDefault();
            props.navigator('raise-complaint', false);
        }   
    }

    function directComplaintHistory(){
        const form = document.getElementById("dashboard");
        form.addEventListener('submit', viewComplaintHistory);

        async function viewComplaintHistory(event){
            event.preventDefault();

            const username = props.userDetails.userName;

            const result = await fetch("http://localhost:8080/ViewComplaintHistory", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username
                }),    
            }).then((res) => res.json());

            props.setComplaintsHistory(result.complaintArray);
            props.navigator('view-complaint-history', false);
        }
    }

    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>Dashboard</h1>
                <form id="dashboard">
                    <button onClick={directRaiseComplaint} name="DirectRaiseComplaint" type="submit" class="submit-btn btn btn-primary">Raise Complaint</button>
                    <button onClick={directComplaintHistory} name="DirectComplaintHistory" type="submit" class="btn btn-primary">Complaint History</button>
                    {/* <button onClick={directTrackComplaint} name="DirectTrackComplaint" type="submit" class="btn btn-primary">Track Your Complaint</button>
                    <button onClick={directPayment} name="DirectPayment" type="submit" class="btn btn-primary">Payment</button> */}
                </form>
            </div>
        </div>
    );
}

export default CustomerDashboard;