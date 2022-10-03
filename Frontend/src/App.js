import React from 'react';
import CustomerCall from './CustomerCall';
import RaiseComplaint from './raiseComplaint';
import SignIn from './login';
import SignUp from './signUp'; 
import RegisterNewRole from './registerNewRole';
import Dashboard from './dashboard';
import HomeScreenPage from './homeScreen';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function App(props) {

  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState(0);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  function setUserDetails(username, contact, firstName, lastName, email){
    setUserName(username);
    setUserContact(contact);
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setUserEmail(email);
  }

  function logOut(){
    setUserName("");
    setUserContact(0);
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    navigator('/', true);
  }

  function navigator(position, replace) {
    props.navigate(position, {replace: replace});
  }

  return (
    <>
    <Routes>
      <Route exact path="/" element={<HomeScreenPage navigator={navigator}/>}></Route>
      <Route exact path="sign-up-page" element={<SignUp setUserDetails={setUserDetails} navigator={navigator}/>}></Route>
      <Route exact path="login-page" element={<SignIn setUserDetails={setUserDetails} navigator={navigator}/>}></Route>
      <Route exact path="register-new-role" element={<RegisterNewRole setUserDetails={setUserDetails} navigator={navigator}/>}></Route>
      <Route exact path="dashboard" element={<Dashboard logOut={logOut} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="raise-complaint" element={<RaiseComplaint logOut={logOut} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
    </Routes>
    </>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <App navigate={navigate}/>
}

export default WithNavigate;
