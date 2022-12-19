import React from 'react';


function SignUp(props){
    

    function ShowSpecialisationList(){
        // const check = document.getElementsByName("RadioSignUp");
        // console.log(check);
        const isCheckedPlumber = document.getElementById("RadioSignUpAsPlumber").checked;

        if (isCheckedPlumber){
            document.getElementById("SpecialisationList").style.display = "block";
        }
        else{
            document.getElementById("SpecialisationList").style.display = "none";
        }
    }

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

            const Specialisations = ["BasinSink", "Grouting", "BathFitting", "DrainagePipe", "Toilet", "TapMixer", "WaterTank", "Motor", "WaterConnection"]
            const plumberSpecialisations = []
            
            let roleCustomer = "", rolePlumber = "", roleManager = "";

            if (RoleCustomer){
                roleCustomer = "Customer";
            }
            if (RolePlumber){
                rolePlumber = "Plumber";
    
                Specialisations.forEach((Specialisation) => {
                    if (document.getElementById(Specialisation).checked){
                        plumberSpecialisations.push(Specialisation);
                    }
                });
            }
            if (RoleManager){
                roleManager = "Manager";
            }

            console.log(plumberSpecialisations);

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
                    Role: [roleCustomer, rolePlumber, roleManager],
                    plumberSpecialisations
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
                            <input onClick={ShowSpecialisationList} class="form-check-input" type="radio" name="RadioSignUp" id="RadioSignUpAsCustomer" value="option1" />
                            <label class="form-check-label" for="RadioSignUpAsCustomer">
                                Customer
                            </label>
                        </div>

                        <div class="form-check">
                            <input onClick={ShowSpecialisationList} class="form-check-input" type="radio" name="RadioSignUp" id="RadioSignUpAsPlumber" value="option2" />
                            <label class="form-check-label" for="RadioSignUpAsPlumber">
                                Plumber
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input onClick={ShowSpecialisationList} class="form-check-input" type="radio" name="RadioSignUp" id="RadioSignUpAsManager" value="option3" />
                            <label class="form-check-label" for="RadioSignUpAsManager">
                                Manager
                            </label>
                        </div>
                    </div>
                </div>

                <div id="SpecialisationList" class="PlumberSpecialisations form-group">
                    <label>Choose Your Specializations</label>
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
                
                <button onClick={triggerSignUp} name="SignUpButton" type="submit" class="submit-btn btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;