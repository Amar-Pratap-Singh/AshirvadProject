const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const path = require('path');

const app = express();

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

app.get('/api/buttonClick', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.json({response: "Client requested server for data"});
});


// Server as a separate module

app.get('/', async(req, res)=>{
    res.send("You are testing Server Side");
});



app.listen(3700, function(req, res){
    console.log("Server is listening on port 3700");
});