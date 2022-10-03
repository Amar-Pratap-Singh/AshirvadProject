import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';
import RaiseComplaint from './raiseComplaint';


function RegisterNewRole(props){

    function UpdateRoles(){
        const form = document.getElementById("update-roles-form");
        form.addEventListener('submit', updateRoles);

        async function updateRoles(event){
            event.preventDefault();

            const username = document.getElementById("CustomerUsername").value;
            const Password = document.getElementById("CustomerPassword").value;
            const RoleCustomer = document.getElementById("AddNewCustomerRole").checked;
            const RolePlumber = document.getElementById("AddNewPlumberRole").checked;
            const RoleManager = document.getElementById("AddNewManagerRole").checked;

            let roleCustomer = "", rolePlumber = "", roleManager = "";

            if (RoleCustomer){
                roleCustomer = "Customer";
            }
            if (RolePlumber){
                rolePlumber = "Plumber";
            }
            if (RoleManager){
                roleManager = "Manager";
            }

            const result = await fetch("http://localhost:8080/RegisterNewRole", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    Password,
                    Role: [roleCustomer, rolePlumber, roleManager]
                }),    
            }).then((res) => res.json());

            console.log(result.status);

            if(result.status === "ok") {
                console.log("Updated!")
                props.navigator('login-page', false);
            }
        }
    }

    return (
        <div class="center_div">
            <h1>Register for New Roles</h1>
            <form id="update-roles-form">
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
                    <label for="Role">Select </label>

                    <div class="col-8">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="AddNewCustomerRole" value="option1" />
                            <label class="form-check-label" for="AddNewCustomerRole">
                                Customer
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="AddNewPlumberRole" value="option2" />
                            <label class="form-check-label" for="AddNewPlumberRole">
                                Plumber
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="AddNewManagerRole" value="option3" />
                            <label class="form-check-label" for="AddNewManagerRole">
                                Manager
                            </label>
                        </div>
                    </div>
                </div>
             
                <button onClick={UpdateRoles} name="updateRolesButton" type="submit" class="submit-btn btn btn-primary">Update Roles</button>
            </form>
        </div>
    );
}

export default RegisterNewRole;