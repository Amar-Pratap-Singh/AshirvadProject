import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';

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

            console.log(result.status)
        }
    }


    return (
        <div>
            <h1>Raise a Complaint</h1>
            <form id="complaint-form">
                <div class="form-group">
                    <label for="CustomerUsername">Username</label>
                    <div class="col-3">
                        <input type="text" class="form-control" id="CustomerUsername" placeholder="Username" />
                    </div>
                </div>
           
                <div class="form-group">
                    <label for="CustomerContact">Contact</label>
                    <div class="col-3">
                        <input type="number" class="form-control" id="CustomerContact" placeholder="Contact" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="CustomerComplaint">Raise Your Issue</label>
                    <div class="col-3">
                        <textarea class="form-control rounded-0" id="CustomerComplaint" rows="5"></textarea>
                    </div>
                </div>
             
                <button onClick={triggerRaiseComplaint} name="raiseComplaintButton" type="submit" class="btn btn-primary">Raise Complaint</button>
            </form>
        </div>
    );
}

export default RaiseComplaint;