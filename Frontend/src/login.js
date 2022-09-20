import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';
import RaiseComplaint from './raiseComplaint';


function SignIn(props){
    
    function triggerSignIn(){
        const form = document.getElementById("login-form");
        form.addEventListener('submit', login);

        async function login(event){
            event.preventDefault();

            const username = document.getElementById("CustomerUsername").value;
            const Password = document.getElementById("CustomerPassword").value;

            const result = await fetch("http://localhost:8080/SignIn", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    Password
                }),    
            }).then((res) => res.json());

            console.log(result.status);
            if(result.status === "ok") {
                props.navigator('dashboard', false);
            }

        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form id="login-form">
                <div class="form-group">
                    <label for="CustomerUsername">Username</label>
                    <div class="col-3">
                        <input type="text" class="form-control" id="CustomerUsername" placeholder="Username" />
                    </div>
                </div>
               
                <div class="form-group">
                    <label for="CustomerPassword">Password</label>
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