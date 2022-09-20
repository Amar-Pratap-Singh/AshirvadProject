import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';
import RaiseComplaint from './raiseComplaint';


function Dashboard(props){
    
    function directRaiseComplaint(){

        const form = document.getElementById("dashboard");
        form.addEventListener('submit', raisingComplaint);

        async function raisingComplaint(event){
            event.preventDefault();

            // get user details and fill the raise complaint form 
            props.navigator('raise-complaint', false);
        }   
    }


    return (
        <div>
            <h1>DashBoard</h1>
            <form id="dashboard">
                <button onClick={directRaiseComplaint} name="DirectRaiseComplaint" type="submit" class="btn btn-primary">Raise Complaint</button>
                {/* <button onClick={directTrackComplaint} name="DirectTrackComplaint" type="submit" class="btn btn-primary">Track Your Complaint</button>
                <button onClick={directHistory} name="DirectHistory" type="submit" class="btn btn-primary">History</button>
                <button onClick={directPayment} name="DirectPayment" type="submit" class="btn btn-primary">Payment</button> */}
            </form>
        </div>
    );
}

export default Dashboard;