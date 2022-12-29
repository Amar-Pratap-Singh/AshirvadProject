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
            const ComplaintTypes = ["BasinSink", "Grouting", "BathFitting", "DrainagePipe", "Toilet", "TapMixer", "WaterTank", "Motor", "WaterConnection"]
            
            const CustomerComplaintCategory = []

            ComplaintTypes.forEach((complaintType) => {
                if (document.getElementById(complaintType).checked){
                    CustomerComplaintCategory.push(complaintType);
                }
            })

            console.log(CustomerComplaintCategory);

            const result = await fetch("http://localhost:8080/RaiseComplaint", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    Contact,
                    Complaint,
                    CustomerComplaintCategory
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
                        <label>Select Complaint Type(s)</label>
                        <div class="ComplaintCategories col-8">
                            
                            <input type="checkbox" id="BasinSink" value="BasinSink" />
                            <label for="BasinSink"> Basin & Sink </label><br></br>
                            
                            <input type="checkbox" id="Grouting" value="Grouting" />
                            <label for="Grouting"> Grouting </label><br></br>
                            
                            <input type="checkbox" id="BathFitting" value="BathFitting" />
                            <label for="BathFitting"> Bath fitting </label><br></br>

                            <input type="checkbox" id="DrainagePipe" value="DrainagePipe" />
                            <label for="DrainagePipe"> Drainage Pipe </label><br></br>

                            <input type="checkbox" id="Toilet" value="Toilet" />
                            <label for="Toilet"> Toilet </label><br></br>

                            <input type="checkbox" id="TapMixer" value="TapMixer" />
                            <label for="TapMixer"> Tap & Mixer </label><br></br>

                            <input type="checkbox" id="WaterTank" value="WaterTank" />
                            <label for="WaterTank"> Water Tank </label><br></br>

                            <input type="checkbox" id="Motor" value="Motor" />
                            <label for="Motor"> Motor </label><br></br>

                            <input type="checkbox" id="WaterConnection" value="WaterConnection" />
                            <label for="WaterConnection"> Water Connection </label><br></br>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="CustomerComplaint">Raise Your Concern</label>
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