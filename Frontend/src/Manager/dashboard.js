import React from 'react';
import Navbar from '../Navbar';

function ManagerDashboard(props){

    function directAssignComplaint(){
        const form = document.getElementById("dashboard");
        form.addEventListener("submit", assignComplaints);

        async function assignComplaints(event){
            event.preventDefault();

            const result = await fetch("http://localhost:8080/AssignComplaints", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                }
            }).then((res) => res.json());

            props.setAllPlumbers(result.plumbersIDArray, result.plumbersDataArray);

            props.navigator('assign-complaints', false);
            // console.log(result.plumbersIDArray);
            // console.log(result.plumbersDataArray);
        }
    }

    
    function checkComplaints(){
        const form = document.getElementById("dashboard");
        form.addEventListener("submit", managerCheckComplaints);

        async function managerCheckComplaints(event){
            event.preventDefault();

            console.log("here");
            const result = await fetch("http://localhost:8080/ManagerCheckComplaints", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                }
            }).then((res) => res.json());
        

            props.setAllComplaints(result.complaintsIDArray, result.complaintsDataArray);

            props.navigator('all-complaints', false);
            // console.log(result.complaintsIDArray);
            // console.log(result.complaintsDataArray);
        }
    }

    function autoAssignComplaint(){
        const form = document.getElementById("dashboard");
        form.addEventListener("submit", autoAssignComplaints);

        async function autoAssignComplaints(event){
            event.preventDefault();

            const result = await fetch("http://localhost:8080/AutoAssignComplaints", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                }
            }).then((res) => res.json());

            props.navigator("manager-dashboard", false);
            // props.setAllPlumbers(result.plumbersIDArray, result.plumbersDataArray);

            // props.navigator('assign-complaints', false);
            // console.log(result.plumbersIDArray);
            // console.log(result.plumbersDataArray);
        }
    }


    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>Dashboard</h1>
                <form id="dashboard">
                    <button onClick={checkComplaints} name="DirectCheckComplaint" type="submit" class="submit-btn btn btn-primary">Check Complaints</button>
                    <button onClick={directAssignComplaint} name="DirectAssignComplaint" type="submit" class="submit-btn btn btn-primary">Assign Complaints</button>
                    <button onClick={autoAssignComplaint} name="AutoAssignComplaint" type="submit" class="submit-btn btn btn-primary">Auto-Assign Complaints</button>
                </form>
            </div>
        </div>
    );
}

export default ManagerDashboard;