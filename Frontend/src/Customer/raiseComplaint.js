import React from 'react';
import Navbar from '../Navbar';


function RaiseComplaint(props){

    function triggerRaiseComplaint(){
        const form = document.getElementById("complaint-form");
        form.addEventListener('submit', raisingComplaint);

        async function raisingComplaint(event){
            event.preventDefault();

            const username = document.getElementById("CustomerUsername").value;
            const Contact = document.getElementById("CustomerContact").value;
            const Complaint = document.getElementById("CustomerComplaint").value;

            const result = await fetch("http://localhost:8080/RaiseComplaint", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    Contact,
                    Complaint
                }),    
            }).then((res) => res.json());

            console.log("Complaint Raised Success: ", result.status);
            props.navigator('customer-dashboard', false);
        }
    }


    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>Raise a Complaint</h1>
                <form id="complaint-form">
                    <div class="form-group">
                        <label for="CustomerUsername">Username</label>
                        <div class="col-8">
                            <input type="text" class="form-control" id="CustomerUsername" placeholder="Username" value={props.userDetails.userName} disabled="disabled"/>
                        </div>
                    </div>
            
                    <div class="form-group">
                        <label for="CustomerContact">Contact</label>
                        <div class="col-8">
                            <input type="number" class="form-control" id="CustomerContact" placeholder="Contact" value={props.userDetails.userContact}/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="CustomerComplaint">Raise Your Issue</label>
                        <div class="col-8">
                            <textarea class="form-control rounded-0" id="CustomerComplaint" rows="5"></textarea>
                        </div>
                    </div>
                
                    <button onClick={triggerRaiseComplaint} name="raiseComplaintButton" type="submit" class="submit-btn btn btn-primary">Raise Complaint</button>
                </form>
            </div>
        </div>
    );
}

export default RaiseComplaint;