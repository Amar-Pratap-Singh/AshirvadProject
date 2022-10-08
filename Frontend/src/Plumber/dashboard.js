import React from 'react';
import Navbar from '../Navbar';
// import { useState } from 'react';

function PlumberDashboard(props){


    function directViewComplaint(){

        const form = document.getElementById("dashboard");
        form.addEventListener('submit', viewComplaint);

        async function viewComplaint(event){
            event.preventDefault();

            // Idea is that plumber will login as plumber. He won't have access to individuals' complaints. What we can do, is we will go to back end and fetch all the users' complaints

            const username = props.userDetails.userName;

            const result = await fetch("http://localhost:8080/MyComplaints", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username
                })
            }).then((res) => res.json());
            
            props.setAssignedComplaints(result.customerUsernames, result.assignedComplaintIDs, result.assignedComplaints);
            console.log("Customers: ", props.customers);
            props.navigator('my-complaints', false);
        }
        
    }


    function directAcceptedComplaint(){
       
        const form = document.getElementById("dashboard");
        form.addEventListener('submit', viewAcceptedComplaint);

        async function viewAcceptedComplaint(event){
            event.preventDefault();

            const username = props.userDetails.userName;

            // console.log("Username: ", username);
            
            const result = await fetch("http://localhost:8080/ViewAcceptedComplaints", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username
                })
            }).then((res) => res.json());

            console.log(result.status);

            props.setAcceptedComplaints(result.acceptedComplaintArray, result.acceptedComplaintIDs, result.complaintsStatus, result.customerUsernames);
            props.navigator('view-accepted-complaints', false);
        }

    }

    return (
        <div>
            <Navbar props={props}/>
            
            <div class="center_div">
                <h1>Dashboard</h1>
                <form id="dashboard">
                    <button onClick={directViewComplaint} name="DirectViewComplaint" type="submit" class="submit-btn btn btn-primary">My Complaints</button>
                    <button onClick={directAcceptedComplaint} name="DirectAcceptedComplaint" type="submit" class="submit-btn btn btn-primary">Accepted Complaints</button>
                </form>
            </div>
        </div>
    );
}

export default PlumberDashboard;