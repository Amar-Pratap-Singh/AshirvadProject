import React from 'react';


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
            const RoleCustomer = document.getElementById("RadioSignUpAsCustomer").checked;
            const RolePlumber = document.getElementById("RadioSignUpAsPlumber").checked;
            const RoleManager = document.getElementById("RadioSignUpAsManager").checked;

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
                    Password,
                    Role: [roleCustomer, rolePlumber, roleManager]
                }),    
            }).then((res) => res.json());

            console.log(result.status);

            if(result.status === "ok") {
                props.setUserDetails(username, Contact, FirstName, LastName, Email);
                props.navigator('login-page', false);
            }
        }
    }


    return (
        <div class="center_div">
            <h1>Sign Up</h1>
            <form id="signUp-form">
                <div class="form-group">
                    <label for="CustomerUsername">Username</label>
                    <div class="col-8">
                        <input type="text" class="form-control" id="CustomerUsername" placeholder="Username" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="CustomerFirstName">First Name</label>
                    <div class="col-8"> 
                        <input type="text" class="form-control" id="CustomerFirstName"   placeholder="First Name" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="CustomerLastName">Last Name</label>
                    <div class="col-8">
                        <input type="text" class="form-control" id="CustomerLastName"  placeholder="Last Name" />
                    </div>
                
                </div>
                <div class="form-group">
                    <label for="CustomerEmail">Email address</label>
                    <div class="col-8">
                        <input type="email" class="form-control" id="CustomerEmail"  placeholder="Email" />
                    </div>                
                </div>

                <div class="form-group">
                    <label for="CustomerContact">Contact</label>
                    <div class="col-8">
                        <input type="number" class="form-control" id="CustomerContact"  placeholder="Contact" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="CustomerPassword">Enter your password</label>
                    <div class="col-8">
                        <input type="password" class="form-control rounded-0" id="CustomerPassword" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="Role">Sign Up as</label>

                    <div class="col-8">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="RadioSignUpAsCustomer" id="RadioSignUpAsCustomer" value="option1" />
                            <label class="form-check-label" for="RadioSignUpAsCustomer">
                                Customer
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="RadioSignUpAsPlumber" id="RadioSignUpAsPlumber" value="option2" />
                            <label class="form-check-label" for="RadioSignUpAsPlumber">
                                Plumber
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="RadioSignUpAsManager" id="RadioSignUpAsManager" value="option3" />
                            <label class="form-check-label" for="RadioSignUpAsManager">
                                Manager
                            </label>
                        </div>
                    </div>
                </div>
                
                <button onClick={triggerSignUp} name="SignUpButton" type="submit" class="submit-btn btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;