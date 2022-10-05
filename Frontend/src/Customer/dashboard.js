import React from 'react';


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
                    <button onClick={directComplaintHistory} name="DirectComplaintHistory" type="submit" class="btn btn-primary">Complaint History</button>
                    {/* <button onClick={directTrackComplaint} name="DirectTrackComplaint" type="submit" class="btn btn-primary">Track Your Complaint</button>
                    <button onClick={directPayment} name="DirectPayment" type="submit" class="btn btn-primary">Payment</button> */}
                </form>
            </div>
        </div>
    );
}

export default CustomerDashboard;