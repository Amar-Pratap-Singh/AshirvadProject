import React from 'react';
import RaiseComplaint from './Customer/raiseComplaint';
import SignIn from './login';
import SignUp from './signUp'; 
import RegisterNewRole from './registerNewRole';
import CustomerDashboard from './Customer/dashboard';
import PlumberDashboard from './Plumber/dashboard';
import ManagerDashboard from './Manager/dashboard';
import HomeScreenPage from './homeScreen';
import ViewComplaintHistory from './Customer/complaintHistory';
import MyComplaints from './Plumber/myComplaints';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function App(props) {

  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState(0);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [userComplaintsHistoryIDs, setUserComplaintsHistoryIDs] = useState([]);
  const [userComplaintsHistory, setUserComplaintsHistory] = useState([]); 
  const [plumberAssignedComplaints, setPlumberAssignedComplaints] = useState([]);
  const [plumberAssignedComplaintIDs, setPlumberAssignedComplaintsIDs] = useState([]);
  const [customerUsername ,setCustomerUsername] = useState([]);

  function setUserDetails(username, contact, firstName, lastName, email){
    setUserName(username);
    setUserContact(contact);
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setUserEmail(email);
  }

  function setComplaintsHistory(complaintsArray){
    setUserComplaintsHistory(complaintsArray);
  }

  function setAssignedComplaints(customerUsername, assignedComplaintIDs, assignedComplaints){
    setPlumberAssignedComplaintsIDs(assignedComplaintIDs);
    setCustomerUsername(customerUsername);
    setPlumberAssignedComplaints(assignedComplaints);
  }

  // ************** Not needed *****************
  // function setComplaintHistoryIDs(complaintID){
  //   // console.log("Before: ", userComplaintsHistoryIDs);
  //   setUserComplaintsHistoryIDs(...userComplaintsHistoryIDs, complaintID);
  //   // console.log("After: ", userComplaintsHistoryIDs);
  // }
  // ************** Not needed *****************



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
      <Route exact path="customer-dashboard" element={<CustomerDashboard logOut={logOut} setComplaintsHistory={setComplaintsHistory}  userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      
      {/* After a complaint is raised, complaintHistory should update, for that passing {setComplaintHistory} */}
      <Route exact path="raise-complaint" element={<RaiseComplaint logOut={logOut} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="view-complaint-history" element={<ViewComplaintHistory logOut={logOut} userComplaintsHistory={userComplaintsHistory} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>


      {/* Plumber */}
      <Route exact path="plumber-dashboard" element={<PlumberDashboard logOut={logOut} customers={customerUsername} setAssignedComplaints={setAssignedComplaints} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="my-complaints" element={<MyComplaints logOut={logOut} customers={customerUsername} assignedComplaintIDs={plumberAssignedComplaintIDs} assignedComplaints={plumberAssignedComplaints} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      
      
      {/* Manager */}
      <Route exact path="manager-dashboard" element={<ManagerDashboard logOut={logOut} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
    </Routes>
    </>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <App navigate={navigate}/>
}

export default WithNavigate;
