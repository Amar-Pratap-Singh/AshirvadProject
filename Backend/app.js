const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const path = require('path');
const admin = require("firebase-admin");
const credentials = require("./DataBase/key.json");


admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://ashirvad-2.firebaseio.com" 
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.set('/src', path.join(__dirname, '/src'))


app.use(cors());


app.use(
    cors({
        origin: "*",
    })
    );


    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


// Server as a separate module
app.get('/', async(req, res)=>{
    res.send("You are testing Server Side");
});


const db = admin.firestore();


// SIGN UP
app.post('/SignUp', async (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const id = req.body.username;
        const userJson = {
            firstName: req.body.FirstName,
            lastName: req.body.LastName,
            username: req.body.username,
            email: req.body.Email,
            contact: req.body.Contact,
            password: req.body.Password,
            role: req.body.Role,
        };

        const customerCredsJson = {
            username: req.body.username,
            password: req.body.Password,
            contact: req.body.Contact,
            complaints: []
        };

        const plumberCredsJson = {
            username: req.body.username,
            password: req.body.Password,
            complaints: [],
            acceptedComplaints: [],
            specialisations: req.body.plumberSpecialisations
        };

        const managerCredsJson = {
            username: req.body.username,
            password: req.body.Password,
            complaints: []
        };


        const user = await db.collection('RegisteredUsers').doc(id).get();

        if (user.exists) {
            console.log('Username already taken!');
        } 
        else {
            let response = await db.collection("RegisteredUsers").doc(id).set(userJson);
            let verify = 1;
            
            for (let roleIndex = 0; roleIndex < 3 ; roleIndex++){
                if (userJson.role[roleIndex] !== ""){

                    if (userJson.role[roleIndex] === "Customer"){
                        response = await db.collection("RegisteredCustomer").doc(id).set(customerCredsJson);
                        if (!response)
                            verify = 0;
                    }

                    else if (userJson.role[roleIndex] === "Plumber"){
                        response = await db.collection("RegisteredPlumber").doc(id).set(plumberCredsJson);
                        if (!response)
                            verify = 0;
                    }

                    else if (userJson.role[roleIndex] === "Manager"){
                        response = await db.collection("RegisteredManager").doc(id).set(managerCredsJson);
                        if (!response)
                            verify = 0;
                    }
                }
            }
    
            if(verify) {
                res.json({ status: "ok" }) 
            }
            else {
                res.json({ status: "error" })
            }
        }
    }
    catch(error){
        res.send({status: error});
        return;
    }
})


// SIGN IN
app.post('/SignIn', async (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const id = req.body.username;
        const password = req.body.Password;
        const role = req.body.Role;
      

        const user = await db.collection('Registered'+role).doc(id).get();
        const registeredUsers = await db.collection('RegisteredUsers').doc(id).get();
         
        let response = 0;

        if (!user.exists) {
            console.log('User Not Registered!');
        } 
        else {
            userDataJson = user.data();
            if (userDataJson.password === password){
                response = 1;
                console.log("success!");
            }
            else{
                console.log("Incorrect password!");
            }
        }

        if(response) {
            res.json({ status: "ok", userData: registeredUsers.data()}) 
        }
        else {
            res.json({ status: "error" })
        }
    }
    catch(error){
        res.send({status: error});
        return;
    }
})


// // REGISTER NEW ROLE
// app.post('/RegisterNewRole', async (req, res) =>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     try{
//         const id = req.body.username;
//         const password = req.body.Password;
//         const role = req.body.Role;

        
//         const user = await db.collection('RegisteredUsers').doc(id).get();
//         let verify = 1;
//         let userRoles = user.data().role;


//         if (!user.exists) {
//             console.log('User Not Registered!');
//         } 
        
//         else {
       
//             const customerCredsJson = {
//                 username: req.body.username,
//                 password: req.body.Password,
//                 contact: user.data().contact,
//                 complaints: []
//             };
    
//             const plumberCredsJson = {
//                 username: req.body.username,
//                 password: req.body.Password,
//                 complaints: [],
//                 acceptedComplaints: []
//             };
    
//             const managerCredsJson = {
//                 username: req.body.username,
//                 password: req.body.Password,
//                 complaints: []
//             };

//             let response = 1;
//             userDataJson = user.data();
//             if (userDataJson.password === password){
//                 console.log("Password success!");

//                 for (let roleIndex = 0; roleIndex < 3 ; roleIndex++){
//                     if (role[roleIndex] !== ""){
//                         userRoles[roleIndex] = role[roleIndex];
                        
//                         if (role[roleIndex] === "Customer"){
//                             response = await db.collection("RegisteredCustomer").doc(id).set(customerCredsJson);
//                             if (!response)
//                                 verify = 0;
//                         }
                        
//                         else if (role[roleIndex] === "Plumber"){
//                             response = await db.collection("RegisteredPlumber").doc(id).set(plumberCredsJson);
//                             if (!response)
//                                 verify = 0;
//                         }
    
//                         else if (role[roleIndex] === "Manager"){
//                             response = await db.collection("RegisteredManager").doc(id).set(managerCredsJson);
//                             if (!response)
//                                 verify = 0;
//                         }
//                     }
                
//                 }
//             }
//             else{
//                 console.log("Incorrect password!");
//             }
//         }

//         const response = await db.collection('RegisteredUsers').doc(id).set({
//             role: userRoles
//         }, { merge: true });

//         if(verify && response) {
//             res.json({ status: "ok", userData: user.data()}) 
//         }
//         else {
//             res.json({ status: "error" })
//         }
//     }
//     catch(error){
//         res.send({status: error});
//         return;
//     }
// })




// Raise Complaints
app.post('/RaiseComplaint', async (req, res) =>{
    
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const id = db.collection("Complaints").doc().id;
        const userJson = {
            username: req.body.username,
            contact: req.body.Contact,
            complaint: req.body.Complaint,
            complaintCategory: req.body.CustomerComplaintCategory,
            billAmount: "0",
            purchaseTypeHistory: [],
            purchaseDetailsHistory: [],
            purchaseCostHistory: [],
            paid: false,
            plumberUsername: "",
            status: "raised"
        };
        
        const response1 = db.collection("Complaints").doc(id).set(userJson);
        console.log("Id of the newest complaint: ", id);


        const registeredCustomer = await db.collection('RegisteredCustomer').doc(req.body.username).get();
        let complaints = registeredCustomer.data().complaints; 
        complaints.push(id);
        // console.log("Complaints: ", complaints);

        
        const response2 = await db.collection('RegisteredCustomer').doc(req.body.username).set({
            complaints: complaints,
            contact: req.body.Contact
        }, { merge: true });
        

        if(response1 && response2) {
            res.json({ status: "ok"}) 
        }
        else {
            res.json({ status: "error" })
        }
    }catch(error){
      res.send({status: error});
    }
})



// View Complaint History
app.post('/ViewComplaintHistory', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const username = req.body.username;
        const registeredCustomer = await db.collection('RegisteredCustomer').doc(username).get();

        const customerComplaints = registeredCustomer.data().complaints;

        const complaintArray = [];
        var complaintRecord;
        var complaintData;
        
        for (const ids of customerComplaints.values()){
            complaintRecord = await db.collection('Complaints').doc(ids).get();
            complaintData = complaintRecord.data();

            complaintData.id = ids;
            complaintArray.push(complaintData);
        }
        
        res.json({status: "ok", complaintArray: complaintArray});
    }
    catch(error){
        res.send({status: error});
        return;
    }
})


// Cancel Complaint
app.post('/CancelComplaint',  async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;

        const response = await db.collection("Complaints").doc(complaintID).set({
            status: "cancelled"
        }, {merge: true});

        if (response){
            res.json({status: "ok"});
        }
        else{
            res.json({status: "error"});
        }
    }
    catch(error){
        res.send({status: error});
        return;
    }
})


// Submit Feedback
app.post('/SubmitFeedback', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;
        const feedback = req.body.feedback;

        const response = await db.collection("Complaints").doc(complaintID).set({
            status: "completed",
            feedback: feedback
        }, {merge: true});

        if (response){
            res.json({status: "ok"});
        }
        else{
            res.json({status: "error"});
        }
    }
    catch(error){
        res.send({status: error});
        return;
    }
})




// Make Payment
app.post('/MakePayment', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;
        const amountToPay = req.body.amountToPay;

        // var response = 0;
        // const complaintData = await db.collection("Complaints").doc(complaintID).get();
        // Considering 10% GST
       
        var response = await db.collection("Complaints").doc(complaintID).set({
            paid: true,
            status: "paid"
        }, {merge: true});

        // else{
            // alert("Please pay the specified amount!");
        // }

        if (response){
            res.json({status: "ok"});
        }
        else{
            res.json({status: "error"});
        }
    }
    catch(error){
        res.send({status: error});
        return;
    }
})



// ################################################################## PLUMBER ##############################################################################
app.post('/MyComplaints', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const username = req.body.username;

        const registeredPlumber = await db.collection("RegisteredPlumber").doc(username).get();
        const assignedComplaintIDs = registeredPlumber.data().complaints;
        
        const assignedComplaints = [];
        const customers = [];
        // const complaintsStatus = [];
        var complaintRecord;
        
        // console.log("Button is clicked")

        for (const ids of assignedComplaintIDs.values()){
            complaintRecord = await db.collection('Complaints').doc(ids).get();
            assignedComplaints.push(complaintRecord.data().complaint);
            customers.push(complaintRecord.data().username);
            // complaintsStatus.push(complaintRecord.data().status);
        }

        res.json({status: "ok", customerUsernames: customers, assignedComplaintIDs: assignedComplaintIDs, assignedComplaints: assignedComplaints});

    }catch(error){
        res.send({status: error});
        return;
    }
})


app.post('/AcceptComplaint', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;
        const plumberUsername = req.body.plumberUsername;
        const updatedComplaintIDs = req.body.updatedComplaintIDs;
        
        // Update the status of the complaint
        const complaintData = await db.collection("Complaints").doc(complaintID).get();
        let response1 = 0;

        if (complaintData.data().status === "assigned"){
            response1 = await db.collection("Complaints").doc(complaintID).set({
                plumberUsername: plumberUsername,
                status: "accepted"
            }, {merge: true});
        }


        const plumberData = await db.collection('RegisteredPlumber').doc(plumberUsername).get();
        
        let acceptedComplaints = plumberData.data().acceptedComplaints; 
        acceptedComplaints.push(complaintID);
        
        console.log("acceptedCOmplaints: ", acceptedComplaints);
        console.log("updatedComplaints: ", updatedComplaintIDs);

        const response2 = await db.collection('RegisteredPlumber').doc(plumberUsername).set({
            acceptedComplaints: acceptedComplaints,
            complaints: updatedComplaintIDs
        }, { merge: true });

        if(response1 && response2) {
            res.json({ status: "ok"}) 
        }
        else {
            res.json({ status: "error" })
        }

    }catch(error){
        res.send({status: error});
        return;
    }
})



app.post('/ViewAcceptedComplaints', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{

        const username = req.body.username;

        const plumberData = await db.collection("RegisteredPlumber").doc(username).get();

        // console.log(plumberData.data());
        const acceptedComplaintIDs = plumberData.data().acceptedComplaints;
        
        const acceptedComplaintArray = [];
        const customers = [];
        const complaintsStatus = [];
        var complaintRecord;
        
        for (const ids of acceptedComplaintIDs.values()){
            complaintRecord = await db.collection('Complaints').doc(ids).get();
            acceptedComplaintArray.push(complaintRecord.data().complaint);
            customers.push(complaintRecord.data().username);
            complaintsStatus.push(complaintRecord.data().status);
        }
        
        console.log("Accepted Complaint: ", acceptedComplaintArray);
        res.json({status: "ok", complaintsStatus: complaintsStatus, acceptedComplaintIDs: acceptedComplaintIDs, acceptedComplaintArray: acceptedComplaintArray, customerUsernames: customers});
        

    }catch(error){
        res.send({status: error});
        return;
    }
})




app.post('/NextPage', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{

        const complaintID = req.body.complaintID;
        const currentStatus = req.body.currentStatus;
        const plumberUsername = req.body.plumberUsername;
        const temp = req.body.temp;

        const complaintData = await db.collection("Complaints").doc(complaintID).get();
        const complaintStatus = complaintData.data().status;

        let response1 = 0;
        let newStatus = "";
        
        // console.log("NEW STATUS: ", newStatus);
        if (currentStatus === complaintStatus){
            console.log("Status are matched! " + currentStatus);
            
            if (currentStatus === "accepted")
                newStatus = "visited";
                
            else if (currentStatus === "visited")
                newStatus = "tobeExecuted";

            else if (currentStatus === "tobeExecuted" && temp === "")
                newStatus = "paused";

            else if (currentStatus === "paused")
                newStatus = "tobeExecuted";

            else if (currentStatus === "tobeExecuted" && temp === "submit")
                newStatus = "executed";
        
            response1 = await db.collection("Complaints").doc(complaintID).set({
                status: newStatus
            }, {merge: true});
        }
        
        let complaintRecord;
        const plumberData = await db.collection("RegisteredPlumber").doc(plumberUsername).get();
        let acceptedComplaintIDs = plumberData.data().acceptedComplaints;
        let complaintStatusArray = [];

        for (const ids of acceptedComplaintIDs.values()){
            complaintRecord = await db.collection("Complaints").doc(ids).get();
            complaintStatusArray.push(complaintRecord.data().status);
        } 

        if (response1){
            res.send({status: "ok", updatedStatus: newStatus, complaintStatusArray: complaintStatusArray});
        }
        else{
            res.send({status: "error"});
        }

    }catch(error){
        res.send({status: error});
        return;
    }
})




app.post('/FillJobCard', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;
        const complaintData = await db.collection("Complaints").doc(complaintID).get();
        const jobCardDetails = complaintData.data();

        console.log(jobCardDetails);

        res.send({status: "ok", jobCardDetails: jobCardDetails});
    }catch(error){
        res.send({status: error});
        return;
    }
})



app.post('/Page2', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;
        const currentStatus = req.body.currentStatus;
        const plumberUsername = req.body.plumberUsername;
        const temp = req.body.temp;

        const complaintData = await db.collection("Complaints").doc(complaintID).get();
        const complaintStatus = complaintData.data().status;

        let newStatus = "";
        
        if (currentStatus === complaintStatus){
            newStatus = "visited";
        }

        let response1 = await db.collection("Complaints").doc(complaintID).set({
            status: newStatus
        }, {merge: true});
        
        let complaintRecord;
        const plumberData = await db.collection("RegisteredPlumber").doc(plumberUsername).get();
        let acceptedComplaintIDs = plumberData.data().acceptedComplaints;
        let complaintStatusArray = [];

        for (const ids of acceptedComplaintIDs.values()){
            complaintRecord = await db.collection("Complaints").doc(ids).get();
            complaintStatusArray.push(complaintRecord.data().status);
        } 

        if (response1){
            res.send({status: "ok", updatedStatus: newStatus, complaintStatusArray: complaintStatusArray});
        }
        else{
            res.send({status: "error"});
        }

    }catch(error){
        res.send({status: error});
        return;
    }
})




app.post('/Page3', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{

        const complaintID = req.body.complaintID;
        const currentStatus = req.body.currentStatus;
        const plumberUsername = req.body.plumberUsername;
        const temp = req.body.temp;
        const quotation = req.body.quotation;
        const billingAmount = req.body.billingAmount;

        const complaintData = await db.collection("Complaints").doc(complaintID).get();
        const complaintStatus = complaintData.data().status;
        
        console.log("BackEND: ", currentStatus);

        var newStatus = "";
        if (currentStatus === complaintStatus){
            newStatus = "tobeExecuted";
        }

        let response1 = await db.collection("Complaints").doc(complaintID).set({
            quotation: quotation,
            quotationAmount: billingAmount,
            billAmount: billingAmount,
            status: newStatus
        }, {merge: true});


        let complaintRecord;
        const plumberData = await db.collection("RegisteredPlumber").doc(plumberUsername).get();
        let acceptedComplaintIDs = plumberData.data().acceptedComplaints;
        let complaintStatusArray = [];

        for (const ids of acceptedComplaintIDs.values()){
            complaintRecord = await db.collection("Complaints").doc(ids).get();
            complaintStatusArray.push(complaintRecord.data().status);
        } 

        if (response1){
            res.send({status: "ok", updatedStatus: newStatus, complaintStatusArray: complaintStatusArray});
        }
        else{
            res.send({status: "error"});
        }

    }catch(error){
        res.send({status: error});
        return;
    }
})





app.post('/Page5', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{

        const complaintID = req.body.complaintID;
        const currentStatus = req.body.currentStatus;
        const plumberUsername = req.body.plumberUsername;
        const temp = req.body.temp;
        const purchaseType = req.body.purchaseType;
        const purchaseDetails = req.body.purchaseDetails;
        const billAmount = req.body.billAmount;
        
        console.log("I am here");

        const complaintData = await db.collection("Complaints").doc(complaintID).get();
        const complaintStatus = complaintData.data().status;
        const currentBillAmount = complaintData.data().billAmount;

        // Retrieve previous purchases type and add a new purchase type
        var purchaseTypeHistory = complaintData.data().purchaseTypeHistory;  
        purchaseTypeHistory.push(purchaseType);

        var purchaseDetailsHistory = complaintData.data().purchaseDetailsHistory;  
        purchaseDetailsHistory.push(purchaseDetails);

        var purchaseCostHistory = complaintData.data().purchaseCostHistory;
        purchaseCostHistory.push(billAmount);

        const updatedBillAmount = Number(currentBillAmount) + Number(billAmount);

        let newStatus = "tobeExecuted";

        let response1 = await db.collection("Complaints").doc(complaintID).set({
            purchaseTypeHistory: purchaseTypeHistory, 
            purchaseDetailsHistory: purchaseDetailsHistory,
            purchaseCostHistory: purchaseCostHistory,
            billAmount: updatedBillAmount,
            status: newStatus
        }, {merge: true});

        
        let complaintRecord;
        const plumberData = await db.collection("RegisteredPlumber").doc(plumberUsername).get();
        let acceptedComplaintIDs = plumberData.data().acceptedComplaints;
        let complaintStatusArray = [];

        for (const ids of acceptedComplaintIDs.values()){
            complaintRecord = await db.collection("Complaints").doc(ids).get();
            complaintStatusArray.push(complaintRecord.data().status);
        } 

        if (response1){
            res.send({status: "ok", updatedStatus: newStatus, complaintStatusArray: complaintStatusArray});
        }
        else{
            res.send({status: "error"});
        }

    }catch(error){
        res.send({status: error});
        return;
    }
})


app.post('/AbandonComplaint', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const complaintID = req.body.complaintID;
        const response = await db.collection("Complaints").doc(complaintID).set({
            status: "cancelled"
        }, {merge: true});
        // const jobCardDetails = complaintData.data();

        res.send({status: "ok"});
    }catch(error){
        res.send({status: error});
        return;
    }
})




// ################################################################## MANAGER ##############################################################################

app.post('/AssignComplaints', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        
        const plumbers = await db.collection("RegisteredPlumber").get();
        const plumbersIDArray = [];
        const plumbersDataArray = [];
        
        plumbers.forEach(doc => {
            plumbersIDArray.push(doc.id);
            plumbersDataArray.push(doc.data());
        });
        
        res.send({status: "ok", plumbersIDArray: plumbersIDArray, plumbersDataArray: plumbersDataArray});

  
    }catch(error){
        res.send({status: error});
        return;
    }
})


app.post('/ManagerCheckComplaints', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        
        const complaints = await db.collection("Complaints").get();
        const complaintsIDArray = [];
        const complaintsDataArray = [];
        
        complaints.forEach(doc => {
            complaintsIDArray.push(doc.id);
            complaintsDataArray.push(doc.data());
        });
        
        res.send({status: "ok", complaintsIDArray: complaintsIDArray, complaintsDataArray: complaintsDataArray});
  
    }catch(error){
        res.send({status: error});
        return;
    }
})

app.post('/AssignComplaintToPlumber', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        
        const plumberUsername = req.body.plumberUsername;
        const complaintID = req.body.complaintID;
        var response = 1;
        var response2 = 1;

        const complaintDoc = db.collection("Complaints").doc(complaintID);
        if (!complaintDoc){
            alert("Invalid Complaint ID");
        }
        else{
            const complaintData = await complaintDoc.get();
            
            if (complaintData.data().status !== "raised"){
                alert("Complaint already assigned!");
            } 
            else{

                response2 = await db.collection("Complaints").doc(complaintID).set({
                    status: "assigned"
                }, {merge: true});

                const plumberData = await db.collection("RegisteredPlumber").doc(plumberUsername).get();
                var plumberComplaints = plumberData.data().complaints;
                plumberComplaints.push(complaintID);
                
                // Update the document
                response = await db.collection("RegisteredPlumber").doc(plumberUsername).set({
                    complaints: plumberComplaints
                }, {merge: true});
            }
        }
        if (response && response2){
            res.send({status: "ok"});
        }
        else{
            res.send({status: "error"});
        }
  
    }catch(error){
        res.send({status: error});
        return;
    }
})



// Assign complaint to plumbers automatically
app.post('/AutoAssignComplaints', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{

        // Check for all the customers' complaint in raised condition
        const complaints = await db.collection("Complaints").get();
        const complaintsID = [];
        
        complaints.forEach(doc => {
            complaintsID.push(doc.id);
        });


        // Check plumbers
        const plumbers = await db.collection("RegisteredPlumber").get();
        const plumberUsernames = [];
        // const complaintsDataArray = [];
        
        plumbers.forEach(doc => {
            plumberUsernames.push(doc.id);
        });
    

        let n = plumberUsernames.length;
        let k = complaintsID.length;

        // Assign weights and capacity and (plumbers + customers + 2) X (plumbers + customers + 2) array
        let cap = [];
        let cost = [];
        let temp = [];
        let temp2 = [];
    

        // from each plumber add a forward edge to every customers
        for (var i=0; i<n ;i++){
            
            temp = [];
            temp2 = [];

            for (var j=0; j<n ;j++){
                temp.push(0);
                temp2.push(0);
            }
            for (var j=n; j<n+k ;j++){
                temp.push(1);
                temp2.push(2); 
            }
            // to source node
            temp.push(0);
            temp2.push(0);

            // to sink node
            temp.push(0);
            temp2.push(0);

            cap.push(temp);
            cost.push(temp2);
        }

        // from each customer add a forward edge to the sink
        // each customer request can be served by at max 1 plumbers
        for (var i=n; i<n+k; i++){
            temp = []
            temp2 = []
            for (var j=0; j<n+k;j++){
                temp.push(0);
                temp2.push(0);
            }
            // to source
            temp.push(0);
            temp2.push(0);

            // to sink
            temp.push(1);
            temp2.push(2);

            cap.push(temp);
            cost.push(temp2);
        }


        // from source node to every plumber node
        // each plumber can serve at max 3 customers
        temp = [];
        temp2 = [];
        for (var i=0; i<n ;i++){
            temp.push(1);
            temp2.push(4);
        }
        for (var i=n; i<n+k; i++){
            temp.push(0);
            temp2.push(0);
        }

        // to itself and sink node
        temp.push(0);
        temp.push(0);
        temp2.push(0);
        temp2.push(0);
        
        cap.push(temp);
        cost.push(temp2);

        // no outgoing edges from sink node
        temp = []
        temp2 = []
        for (var i=0; i<n+k+2 ;i++){
            temp.push(0);
            temp2.push(0);
        }

        cap.push(temp);
        cost.push(temp2);

        // console.log("Cap: ", cap);
        // console.log("Cost: ", cost)
        // Weights

        

        // We need to call algo here      
        // algo will return assignment of plumbers to customers
        function MinCostMaxFlow(cap, cost, s, t){

            let maxsize = Number.MAX_VALUE
        
            // Stores the found edges
            let found = []
        
            // Stores the number of nodes
            let N = 0
        
            // Stores the capacity
            // of each edge
        
            let flow = []
        
            // Stores the cost per
            // unit flow of each edge
        
            // Stores the distance from each node
            // and picked edges for each node
            let dad = []
            let dist = []
            let pi = []
            let assignment = [];
        
            let INF = Math.floor(maxsize / 2) - 1
        
            // Function to check if it is possible to
            // have a flow from the src to sink
            function search(src, sink)
            {
        
                // Initialise found[] to false
                let found = new Array(N).fill(false)
        
                // Initialise the dist[] to INF
                let dist = new Array(N + 1).fill(INF)
        
                // Distance from the source node
                dist[src] = 0
        
                // Iterate until src reaches N
                while (src != N)
                {
                    let best = N
                    found[src] = true
                    
                    for (var k = 0; k < N; k++)
                    {
        
                        // If already found
                        if (found[k])
                            continue
        
                        // Evaluate while flow
                        // is still in supply
                        if (flow[k][src] != 0)
                        {
                            // Obtain the total value
                        let val = (dist[src] + pi[src] -
                                    pi[k] - cost[k][src])
        
                            // If dist[k] is > minimum value
                            if (dist[k] > val)
                            {
                                // Update
                                dist[k] = val
                                dad[k] = src
                            }
                        }
        
                        if (flow[src][k] < cap[src][k])
                        {
                            let val = (dist[src] + pi[src] -
                                    pi[k] + cost[src][k])
        
                            // If dist[k] is > minimum value
                            if (dist[k] > val)
                            {
                                // Update
                                dist[k] = val
                                dad[k] = src
                            }
                        }
        
                        if (dist[k] < dist[best])
                            best = k
                    }
        
                    // Update src to best for
                    // next iteration
                    src = best
                }
        
                for (var k = 0; k < N; k++)
                    pi[k] = Math.min(pi[k] + dist[k], INF)
        
                // Return the value obtained at sink
                return found[sink]
            }
        
            // Function to obtain the maximum Flow
            function getMaxFlow(capi, costi,  src, sink)
            {
        
                cap = capi
                cost = costi
        
                N = (capi).length
                found =  new Array(N).fill(false); 
                    
                flow = new Array(N);
                for (var i = 0; i < N; i++)
                    flow[i] = new Array(N).fill(0)
                
                dist = new Array(N + 1).fill(INF)
                
                dad = new Array(N).fill(0)
                pi = new Array(N).fill(0)
                
                totflow = 0
                totcost = 0
        
        
        
                // If a path exist from src to sink
                while (search(src, sink))
                {
                    let paths = [sink];
                    // Set the default amount
                    amt = INF
                    x = sink
                    
                    while (x != src)
                    {
                        amt = Math.min(
                            amt,
                            (flow[x][dad[x]] != 0)?flow[x][dad[x]]:
                            cap[dad[x]][x] - flow[dad[x]][x])
                        x = dad[x]
                    }
        
                    x = sink
                    
                    while (x != src)
                    {
                        // if dad[x] == 0, then add the existing array into a bigger array
                        paths.push(dad[x]);
        
                        if (flow[x][dad[x]] != 0)
                        {
                            flow[x][dad[x]] -= amt
                            totcost -= amt * cost[x][dad[x]]
                        }
                        else
                        {
                            flow[dad[x]][x] += amt
                            totcost += amt * cost[dad[x]][x]
                        }
                        x = dad[x]
                    }
        
                    totflow += amt
        
                    assignment.push(paths);
                }
                // Return pair total cost and sink
                return assignment;
            }
        
        
            return getMaxFlow(cap, cost, s, t);
            
            // Possible assignments 
            // console.log(assignment);
        }
        

        let assignment = MinCostMaxFlow(cap, cost, n+k, n+k+1);

        let plumberCustomer = []
        for (var i=0; i<assignment.length ;i++){
            plumberCustomer.push([complaintsID[(assignment[i])[1] - n], plumberUsernames[(assignment[i])[2]]]);
            // plumberCustomer.push([(assignment[i])[1], (assignment[i])[2]]);
        }

        // plumberCustomer = [ [complantID, plumberUsername], [complaintID, plumberUsername] ] 
        console.log(plumberCustomer);
        

        for (var i=0; i<plumberCustomer.length ;i++){
            let plumberUsername = (plumberCustomer[i])[1];
            let complaintID = (plumberCustomer[i])[0];
            // var response = 1;

            let complaintDoc = db.collection("Complaints").doc(complaintID);
            if (!complaintDoc){
                alert("Invalid Complaint ID");
            }
            else{
                let complaintData = await complaintDoc.get();
                
                if (complaintData.data().status !== "raised"){
                    alert("Complaint already assigned!");
                } 
                else{
                    response2 = await db.collection("Complaints").doc(complaintID).set({
                        status: "assigned",
                        complaints: plumberComplaints
                    }, {merge: true});

                    let plumberData = await db.collection("RegisteredPlumber").doc(plumberUsername).get();
                    var plumberComplaints = plumberData.data().complaints;
                    plumberComplaints.push(complaintID);
                    
                    // Update the document
                    response = await db.collection("RegisteredPlumber").doc(plumberUsername).set({
                        complaints: plumberComplaints
                    }, {merge: true});
                }
            }
        }

        // Assign these complaints to plumbers
        // show all the customers' complaint assigned to a plumber in his assignedComplaint part
        // Once, a plumber accepts a complaint... We will remove that complaint from other plumbers... And show the assigned Plumber to customer


    }catch(error){
        res.send({status: error});
        return;
    }
})




const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}.`);
})
