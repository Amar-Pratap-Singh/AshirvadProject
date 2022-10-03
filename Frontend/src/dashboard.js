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
            props.navigator('raise-complaint', true);
        }   
    }


    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand" href="#">
                    <img src="https://www.kindpng.com/picc/m/298-2987120_plumbing-white-icon-png-clipart-png-download-sign.png" width="30" height="30" class="profile-pic d-inline-block align-top profile-pic" alt=""></img>
                    Ashirvad
                </a>   

                <span>
                    <a class="navbar-brand" href="#">
                        <img src="https://freesvg.org/img/abstract-user-flat-4.png" width="30" height="30" class="d-inline-block align-top profile-pic" alt=""></img>
                        { props.userDetails.userName }
                    </a> 
                    <button class="btn btn-primary" onClick={props.logOut} type="submit">Log out</button>
                </span> 
            </nav>

            <div class="center_div">
                <h1>Dashboard</h1>
                <form id="dashboard">
                    <button onClick={directRaiseComplaint} name="DirectRaiseComplaint" type="submit" class="submit-btn btn btn-primary">Raise Complaint</button>
                    {/* <button onClick={directTrackComplaint} name="DirectTrackComplaint" type="submit" class="btn btn-primary">Track Your Complaint</button>
                    <button onClick={directHistory} name="DirectHistory" type="submit" class="btn btn-primary">History</button>
                    <button onClick={directPayment} name="DirectPayment" type="submit" class="btn btn-primary">Payment</button> */}
                </form>
            </div>
        </div>
    );
}

export default Dashboard;