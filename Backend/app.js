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

        const userCredsJson = {
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
                    response = await db.collection("Registered"+userJson.role[roleIndex]).doc(id).set(userCredsJson);
                    if (!response)
                        verify = 0;
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


// REGISTER NEW ROLE
app.post('/RegisterNewRole', async (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const id = req.body.username;
        const password = req.body.Password;
        const role = req.body.Role;

        const userCredsJson = {
            username: req.body.username,
            password: req.body.Password
        };

        const user = await db.collection('RegisteredUsers').doc(id).get();
        let verify = 1;
        let userRoles = user.data().role;

        if (!user.exists) {
            console.log('User Not Registered!');
        } 
        
        else {
            userDataJson = user.data();
            if (userDataJson.password === password){
                // console.log("success!");

                for (let roleIndex = 0; roleIndex < 3 ; roleIndex++){
                    if (role[roleIndex] !== ""){
                        userRoles[roleIndex] = role[roleIndex];
                        response = await db.collection("Registered"+role[roleIndex]).doc(id).set(userCredsJson);
                        if (!response)
                            verify = 0;
                    }
                }
            }
            else{
                console.log("Incorrect password!");
            }
        }

        const response = await db.collection('RegisteredUsers').doc(id).set({
            role: userRoles
        }, { merge: true });

        if(verify && response) {
            res.json({ status: "ok", userData: user.data()}) 
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
        
        for (const ids of customerComplaints.values()){
            complaintRecord = await db.collection('Complaints').doc(ids).get();
            complaintArray.push(complaintRecord.data().complaint);
        }
        
        res.json({status: "ok", complaintArray: complaintArray});
    }
    catch(error){
        res.send({status: error});
        return;
    }
})


// ################################################################## 
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
        var complaintRecord;
        
        // console.log("Button is clicked")

        for (const ids of assignedComplaintIDs.values()){
            complaintRecord = await db.collection('Complaints').doc(ids).get();
            assignedComplaints.push(complaintRecord.data().complaint);
            customers.push(complaintRecord.data().username);
        }

        res.json({status: "ok", customerUsernames: customers, assignedComplaintIDs: assignedComplaintIDs, assignedComplaints: assignedComplaints});

    }catch(error){
        res.send({status: error});
        return;
    }
})



const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}.`);
})



// get collection
// const usersDetails = await db.collection('RegisteredUsers').get();