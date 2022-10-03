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
            const RoleCustomer = document.getElementById("RadioLoginAsCustomer").checked;
            const RolePlumber = document.getElementById("RadioLoginAsPlumber").checked;
            const RoleManager = document.getElementById("RadioLoginAsManager").checked;

            let role = "Customer";
            if (RoleCustomer){
                role = "Customer";
            }
            else if (RolePlumber){
                role = "Plumber";
            }
            else if (RoleManager){
                role = "Manager";
            }

            const Role = role;

            const result = await fetch("http://localhost:8080/SignIn", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    Password,
                    Role
                }),    
            }).then((res) => res.json());

            console.log(result.status);

            if(result.status === "ok") {
                props.setUserDetails(result.userData.username, result.userData.contact, result.userData.firstName, result.userData.lastName, result.userData.email);
                props.navigator('dashboard', false);
            }
        }
    }


    function registerNewRole(){
        const form = document.getElementById("login-form");
        form.addEventListener('submit', registerForNewRole);

        async function registerForNewRole(event){
            event.preventDefault();
            props.navigator('register-new-role', false);
        }
    }


    return (
        <div class="center_div">
            <h1>Login</h1>
            <form id="login-form">
                <div class="form-group">
                    <label for="CustomerUsername">Username</label>
                    <div class="col-8">
                        <input type="text" class="form-control" id="CustomerUsername" placeholder="Username" />
                    </div>
                </div>
               
                <div class="form-group">
                    <label for="CustomerPassword">Password</label>
                    <div class="col-8">
                        <input type="password" class="form-control rounded-0" id="CustomerPassword" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="Role">Login As</label>

                    <div class="col-8">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="RadioLoginAs" id="RadioLoginAsCustomer" value="option1" />
                            <label class="form-check-label" for="RadioLoginAsCustomer">
                                Customer
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="RadioLoginAs" id="RadioLoginAsPlumber" value="option2" />
                            <label class="form-check-label" for="RadioLoginAsPlumber">
                                Plumber
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="RadioLoginAs" id="RadioLoginAsManager" value="option3" />
                            <label class="form-check-label" for="RadioLoginAsManager">
                                Manager
                            </label>
                        </div>
                    </div>
                </div>
             
                <button onClick={triggerSignIn} name="SignInButton" type="submit" class="submit-btn btn btn-primary">Login</button>
                <button onClick={registerNewRole} name="RegisterNewRole" type="submit" class="submit-btn btn btn-primary">Register for New Role</button>
            </form>
        </div>
    );
}

export default SignIn;