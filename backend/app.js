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


app.post('/RaiseComplaint', async (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    try{
        const id = req.body.username;
        const userJson = {
            username: req.body.username,
            contact: req.body.Contact,
            complaint: req.body.Complaint,
        };
        
        const response = await db.collection("Complaints").doc(id).set(userJson);
        if(response) {
            res.json({ status: "ok" }) 
        }
        else {
            res.json({ status: "error" })
        }
    }catch(error){
      res.send({status: error});
    }
})



app.post('/SignIn', async (req, res) =>{
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
            password: req.body.Password
        };
        
        const response = await db.collection("RegisteredUsers").doc(id).set(userJson);
        if(response) {
            res.json({ status: "ok" }) 
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


const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}.`);
})