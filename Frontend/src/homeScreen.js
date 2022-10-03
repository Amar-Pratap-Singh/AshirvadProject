import React from 'react';
import { Button } from 'react-bootstrap';
import CircularJSON from 'circular-json';
import RaiseComplaint from './raiseComplaint';


function HomeScreenPage(props){
    
    function goToSignUpPage(){
        const form = document.getElementById("home-screen-page");
        form.addEventListener('submit', openSignUpPage);

        async function openSignUpPage(event){
            event.preventDefault();

            const result = await fetch("http://localhost:8080/SignUp", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }
                // body: JSON.stringify({
                // }),    
            }).then((res) => res.json());
            

            props.navigator('sign-up-page', false);
        }
    }

    function goToLoginPage(){
        const form = document.getElementById("home-screen-page");
        form.addEventListener('submit', openLoginPage);

        async function openLoginPage(event){
            event.preventDefault();

            const result = await fetch("http://localhost:8080/SignIn", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }
                // body: JSON.stringify({
                // }),    
            }).then((res) => res.json());

            props.navigator('login-page', false);
        }
    }


    return (
        <div class="center_div">
            <h1>Home Screen</h1>
            <form id="home-screen-page">
                <button onClick={goToSignUpPage} name="DirectSignUpPage" type="submit" class="home-page-btn btn btn-primary">Sign Up</button>
                <button onClick={goToLoginPage} name="DirectLoginPage" type="submit" class="home-page-btn btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default HomeScreenPage;