import React from 'react';
import CustomerCall from './CustomerCall';
import RaiseComplaint from './raiseComplaint';
import SignIn from './login';
import SignUp from './signUp'; 
import Dashboard from './dashboard';
import HomeScreenPage from './homeScreen';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App(props) {

  function navigator(position, replace) {
    props.navigate(position, {replace: replace});
  }

  return (
    <>
    <Routes>
      <Route exact path="/" element={<HomeScreenPage navigator={navigator}/>}></Route>
      <Route exact path="sign-up-page" element={<SignUp navigator={navigator}/>}></Route>
      <Route exact path="login-page" element={<SignIn navigator={navigator}/>}></Route>
      <Route exact path="dashboard" element={<Dashboard navigator={navigator}/>}></Route>
      <Route exact path="raise-complaint" element={<RaiseComplaint navigator={navigator}/>}></Route>
    </Routes>
    </>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <App navigate={navigate}/>
}

export default WithNavigate;
