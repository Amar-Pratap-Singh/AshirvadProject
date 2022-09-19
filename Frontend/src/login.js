import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';
import RaiseComplaint from './raiseComplaint';


function SignIn(){
    
    function triggerSignIn(){
        const form = document.getElementById("login-form");
        form.addEventListener('submit', login);

        async function login(event){
            event.preventDefault();

            const username = document.getElementById("CustomerUsername").value;
            const FirstName = document.getElementById("CustomerFirstName").value;
            const LastName = document.getElementById("CustomerLastName").value;
            const Email = document.getElementById("CustomerEmail").value;
            const Contact = document.getElementById("CustomerContact").value;
            const Password = document.getElementById("CustomerPassword").value;

            const result = await fetch("http://localhost:8080/SignIn", {
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

        }
    }


    return (
        <div>
            <form id="login-form">
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
             
                <button onClick={triggerSignIn} name="SignInButton" type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default SignIn;