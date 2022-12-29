import React from 'react';

import TestDemo from './testDemo';
import HomeScreenPage from './homeScreen';
import SignIn from './login';
import SignUp from './signUp'; 

import RaiseComplaint from './Customer/raiseComplaint';
import CustomerDashboard from './Customer/dashboard';
import ViewComplaintHistory from './Customer/complaintHistory';
import SubmitFeedback from './SubmitFeedback';
import Payment from './Customer/payment';
import MakePayment from './Customer/makePayment';

import PlumberDashboard from './Plumber/dashboard';
import MyComplaints from './Plumber/myComplaints';
import AcceptedComplaints from './Plumber/acceptedComplaints';
import Page2 from './Pages/page2';
import Page3 from './Pages/page3';
import Page4 from './Pages/page4';
import Page5 from './Pages/page5';
import Page6 from './Pages/page6';
import Page7 from './Pages/page7';

import ManagerDashboard from './Manager/dashboard';
import AllComplaints from './Manager/allComplaints';
import AssignComplaints from './Manager/assignComplaints';


import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function App(props) {

  // .........................   customer side and plumber side ........................................

  // get data for next 5 variables during logging in
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState(0);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [jobCardDetails, setJobCardDetails] = useState();

  // ................................... customer side ..................................................

  // gets user complaints history when we look for complaint history in customer's side
  const [userComplaintsHistory, setUserComplaintsHistory] = useState([]); 

  // const [userComplaintsHistoryIDs, setUserComplaintsHistoryIDs] = useState([]);

  // ................................... Plumber side ..................................................

  // the below 2 variables are used in viewing complaints in the my complaints section that are in raised state only.
  const [plumberAssignedComplaints, setPlumberAssignedComplaints] = useState([]);
  const [plumberAssignedComplaintIDs, setPlumberAssignedComplaintsIDs] = useState([]);
  // const [plumberAssignedComplaintsStatus, setPlumberAssignedComplaintsStatus] = useState([]);
  
  // The below 4 variables are used in viewing the accepted complaints in view accepted complaints page where the statuses here are accepted or above as per hierarchy
  const [plumberAcceptedComplaints, setPlumberAcceptedComplaints] = useState([]);
  const [plumberAccepteddComplaintIDs, setPlumberAcceptedComplaintsIDs] = useState([]);
  const [complaintsStatus, setComplaintsStatus] = useState([]);
  const [customerUsername ,setCustomerUsername] = useState([]);

  // choosing index of the complaint, we are clicking on in Card.js in plumber side 
  const [index, setIndex] = useState(0);

  // The below 2 variables are used in plumber when ever he wants to change the status of complaints after his work in view-accepted-complaints
  const [pageComplaintID, setPageComplaintID] = useState(""); 
  const [pageComplaintStatus, setPageComplaintStatus] = useState(""); 


  // below 2 variables are used in manager for storing all the complaint ID and complaint Data
  const [allComplaintIDs, setAllComplaintsIDArray] = useState([]);
  const [allComplaintData, setAllComplaintsDataArray] = useState([]);

  // below 2 variables are used in manager for storing all the plumber ID and complaint Data
  const [allPlumberIDs, setAllPlumbersIDArray] = useState([]);
  const [allPlumberData, setAllPlumbersDataArray] = useState([]);

  // to submit feedback for a complaintID
  const [complaintID, setComplaintID] = useState('');

  // assigning complaint to plumber   
  const [complaintToAssign, setComplaintToAssign] = useState("");



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
    // setPlumberAssignedComplaintsStatus(assignedComplaintsStatus);
  }

  function setAcceptedComplaints(acceptedComplaints, acceptedComplaintIDs, complaintsStatus, customerUsername){
    setPlumberAcceptedComplaints(acceptedComplaints);
    setPlumberAcceptedComplaintsIDs(acceptedComplaintIDs);
    setCustomerUsername(customerUsername);
    setComplaintsStatus(complaintsStatus);
  }

  function setComplaintsStatusArray(complaintsStatus){
    setComplaintsStatus(complaintsStatus);
  }

  function setComplaintIndex(index){
    setIndex(index);
  }

  function setAllComplaints(allComplaintIDs, allComplaintData){
    setAllComplaintsIDArray(allComplaintIDs);
    setAllComplaintsDataArray(allComplaintData);
  }

  function setAllPlumbers(allPlumberIDs, allPlumberData){
    setAllPlumbersIDArray(allPlumberIDs);
    setAllPlumbersDataArray(allPlumberData);
  }

  function setJobCard(jobCardDetails){
    setJobCardDetails(jobCardDetails);
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
    navigator('home-screen-page', true);
  }


  function demoPage(){
    setUserName("");
    setUserContact(0);
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    navigator('/', false);
  }

  function navigator(position, replace) {
    props.navigate(position, {replace: replace});
  }

  return (
    <>
    <Routes>
      <Route exact path="/" element={<TestDemo navigator={navigator}/>}></Route>
      <Route exact path="home-screen-page" element={<HomeScreenPage navigator={navigator}/>}></Route>
      <Route exact path="sign-up-page" element={<SignUp setUserDetails={setUserDetails} navigator={navigator}/>}></Route>
      <Route exact path="login-page" element={<SignIn setUserDetails={setUserDetails} navigator={navigator}/>}></Route>

     {/*.......... Customer ..........*/}
      <Route exact path="customer-dashboard" element={<CustomerDashboard demoPage={demoPage} logOut={logOut} setComplaintsHistory={setComplaintsHistory}  userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="raise-complaint" element={<RaiseComplaint demoPage={demoPage} logOut={logOut} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="view-complaint-history" element={<ViewComplaintHistory demoPage={demoPage} logOut={logOut} setComplaintID={setComplaintID} userComplaintsHistory={userComplaintsHistory} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="submit-feedback" element={<SubmitFeedback demoPage={demoPage} logOut={logOut} complaintID={complaintID} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>


      {/*.......... Plumber .........*/}
      <Route exact path="plumber-dashboard" element={<PlumberDashboard demoPage={demoPage} logOut={logOut} customers={customerUsername} setAcceptedComplaints={setAcceptedComplaints} setAssignedComplaints={setAssignedComplaints} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="my-complaints" element={<MyComplaints demoPage={demoPage} logOut={logOut} customers={customerUsername} assignedComplaintIDs={plumberAssignedComplaintIDs} assignedComplaints={plumberAssignedComplaints} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="view-accepted-complaints" element={<AcceptedComplaints demoPage={demoPage} logOut={logOut} setComplaintIndex={setComplaintIndex} setPageComplaintStatus={setPageComplaintStatus} setPageComplaintID={setPageComplaintID} setComplaintsStatusArray={setComplaintsStatusArray} complaintsStatus={complaintsStatus} customers={customerUsername} acceptedComplaintIDs={plumberAccepteddComplaintIDs} acceptedComplaints={plumberAcceptedComplaints} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="page-2" element={<Page2 demoPage={demoPage} logOut={logOut} index={index} pageComplaintID={pageComplaintID} pageComplaintStatus={pageComplaintStatus} setPageComplaintStatus={setPageComplaintStatus} setComplaintsStatusArray={setComplaintsStatusArray} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="page-3" element={<Page3 demoPage={demoPage} logOut={logOut} index={index} pageComplaintID={pageComplaintID} pageComplaintStatus={pageComplaintStatus} setPageComplaintStatus={setPageComplaintStatus} setComplaintsStatusArray={setComplaintsStatusArray} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="page-4" element={<Page4 demoPage={demoPage} logOut={logOut} index={index} pageComplaintID={pageComplaintID} pageComplaintStatus={pageComplaintStatus} setPageComplaintStatus={setPageComplaintStatus} setComplaintsStatusArray={setComplaintsStatusArray} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator} setJobCard={setJobCard} jobCard={jobCardDetails}/>}></Route>
      <Route exact path="page-5" element={<Page5 demoPage={demoPage} logOut={logOut} index={index} pageComplaintID={pageComplaintID} pageComplaintStatus={pageComplaintStatus} setPageComplaintStatus={setPageComplaintStatus} setComplaintsStatusArray={setComplaintsStatusArray} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="page-6" element={<Page6 demoPage={demoPage} logOut={logOut} index={index} pageComplaintID={pageComplaintID} pageComplaintStatus={pageComplaintStatus} setPageComplaintStatus={setPageComplaintStatus} setComplaintsStatusArray={setComplaintsStatusArray} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="page-7" element={<Page7 demoPage={demoPage} logOut={logOut} index={index} pageComplaintID={pageComplaintID} pageComplaintStatus={pageComplaintStatus} setPageComplaintStatus={setPageComplaintStatus} setComplaintsStatusArray={setComplaintsStatusArray} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator} jobCard={jobCardDetails}/>}></Route>
      <Route exact path="payment-page" element={<Payment demoPage={demoPage} logOut={logOut} complaintID={complaintID} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator} setJobCard={setJobCard} jobCard={jobCardDetails}/>}></Route>
      <Route exact path="make-payment" element={<MakePayment demoPage={demoPage} logOut={logOut} complaintID={complaintID} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator} jobCard={jobCardDetails}/>}></Route>

      {/* Manager */}
      <Route exact path="manager-dashboard" element={<ManagerDashboard demoPage={demoPage} logOut={logOut} setAllPlumbers={setAllPlumbers} setAllComplaints={setAllComplaints} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="all-complaints" element={<AllComplaints setComplaintToAssign={setComplaintToAssign} demoPage={demoPage} logOut={logOut} allComplaintIDs={allComplaintIDs} allComplaintData={allComplaintData} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
      <Route exact path="assign-complaints" element={<AssignComplaints complaintToAssign={complaintToAssign} demoPage={demoPage} logOut={logOut} allPlumberIDs={allPlumberIDs} allPlumberData={allPlumberData} userDetails={{userName, userContact, userFirstName, userLastName, userEmail}} navigator={navigator}/>}></Route>
    </Routes>
    </>
  );
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <App navigate={navigate}/>
}

export default WithNavigate;
