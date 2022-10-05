import React from 'react';


function PlumberDashboard(props){


    function directViewComplaint(){

        const form = document.getElementById("dashboard");
        form.addEventListener('submit', viewComplaint);

        async function viewComplaint(event){
            event.preventDefault();

            // Idea is that plumber will login as plumber. He won't have access to individuals' complaints. What we can do, is we will go to back end and fetch all the users' complaints

            const result = await fetch("http://localhost:8080/PlumberViewComplaints", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }
            }).then((res) => res.json());

            
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
                    <button onClick={directViewComplaint} name="DirectViewComplaint" type="submit" class="submit-btn btn btn-primary">View Assigned Complaint</button>
                </form>
            </div>
        </div>
    );
}

export default PlumberDashboard;