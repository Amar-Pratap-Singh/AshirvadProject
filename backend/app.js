const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require('path')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.set('/src', path.join(__dirname, '/src'))

// creating a test Database
mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("DB Connected!");
});

app.use(cors());

// Schema of the database
const testdbSchema = mongoose.Schema({
    username: String
});

const Users = mongoose.model("User", testdbSchema);

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

app.post('/api/buttonClick', async(req, res) => {
    const { username } = req.body;
    console.log(username)
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    let checkUser = await testDB.Users.find({'params.value':username});
    if(!checkUser)
      res.json({ status: "error" });
    else if(checkUser.exists)
      res.json({ status: "ok" });
    else
      res.json({ status: "NotExists" });
    
  });





app.listen(3600, function(req, res){
    console.log("Server is listening on port 3600");
});