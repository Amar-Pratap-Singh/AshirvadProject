import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';
import RaiseComplaint from './raiseComplaint';


function SignUp(props){
    
    function triggerSignUp(){
        const form = document.getElementById("signUp-form");
        form.addEventListener('submit', signUp);

        async function signUp(event){
            event.preventDefault();

            const username = document.getElementById("CustomerUsername").value;
            const FirstName = document.getElementById("CustomerFirstName").value;
            const LastName = document.getElementById("CustomerLastName").value;
            const Email = document.getElementById("CustomerEmail").value;
            const Contact = document.getElementById("CustomerContact").value;
            const Password = document.getElementById("CustomerPassword").value;

            const result = await fetch("http://localhost:8080/SignUp", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    FirstName,
                    LastName,
                    Email,
                    Contact,
                    Password
                }),    
            }).then((res) => res.json());

            console.log(result.status);

            if(result.status === "ok") {
                props.navigator('login-page', false);
            }

        }
    }


    return (
        <div>
            <h1>Sign Up</h1>
            <form id="signUp-form">
                <div class="form-group">
                    <label for="CustomerUsername">Username</label>
                    <div class="col-3">
                        <input type="text" class="form-control" id="CustomerUsername" placeholder="Username" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="CustomerFirstName">First Name</label>
                    <div class="col-3"> 
                        <input type="text" class="form-control" id="CustomerFirstName"   placeholder="First Name" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="CustomerLastName">Last Name</label>
                    <div class="col-3">
                        <input type="text" class="form-control" id="CustomerLastName"  placeholder="Last Name" />
                    </div>
                
                </div>
                <div class="form-group">
                    <label for="CustomerEmail">Email address</label>
                    <div class="col-3">
                        <input type="email" class="form-control" id="CustomerEmail"  placeholder="Email" />
                    </div>                
                </div>

                <div class="form-group">
                    <label for="CustomerContact">Contact</label>
                    <div class="col-3">
                        <input type="number" class="form-control" id="CustomerContact"  placeholder="Contact" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="CustomerPassword">Enter your password</label>
                    <div class="col-3">
                        <input type="password" class="form-control rounded-0" id="CustomerPassword" />
                    </div>
                </div>
                
                {/* sign up as
                <div class="form-group">
                    <label for="ClientCategory">SignUp As</label>
                    <div class="col-3">

                    </div>
                </div> */}

             
                <button onClick={triggerSignUp} name="SignUpButton" type="submit" class="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;