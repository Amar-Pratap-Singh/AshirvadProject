import React from 'react';
import Navbar from './Navbar';

function SubmitFeedback(props){
    
    function submitCustomerFeedback(){
        const form = document.getElementById("submit-feedback");
        form.addEventListener('submit', submitFeedback);

        async function submitFeedback(event){
            event.preventDefault();

            const complaintID = props.complaintID; 
            const feedback = document.getElementById("CustomerFeedback").value;

            const result = await fetch("http://localhost:8080/SubmitFeedback", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID,
                    feedback
                }),    
            }).then((res) => res.json());

            props.navigator('customer-dashboard', false);
        }
    }


    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>Submit Feedback</h1>
                <h2>{props.complaintId}</h2>

                <form id="submit-feedback">

                    <div class="form-group">
                        <label for="CustomerFeedback">Feedback Goes Here...</label>
                        <div class="col-8">
                            <textarea class="form-control rounded-0" id="CustomerFeedback" rows="5"></textarea>
                        </div>
                    </div>
                
                    <button onClick={submitCustomerFeedback} name="submitCustomerFeedback" type="submit" class="submit-btn btn btn-primary">Submit Feedback</button>
                </form>
            </div>

        </div>
    );

}

export default SubmitFeedback;