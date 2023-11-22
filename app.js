var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.port||3000;
var mongoose = require("mongoose");
var db = require("./config/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

// Load in Schema
require("./modules/loginSchema");
var LoginInfo = mongoose.model("logins");

// Routes
app.get("/", function(req, res){
    res.redirect("index.html");
})

// Signup
app.post("/signup", function(req, res) {
    new LoginInfo(req.body).save().then(function(){
        console.log(`Login Saved: Username:${req.body.username} & Password:${req.body.password}`);
        res.redirect("index.html");
    })
})

app.post("/checkExistingUsername", function(req, res) {
    LoginInfo.find({username: req.body.username}).then(function(_accountInfo){
        res.json({_accountInfo});
    })
})

// Login
app.post("/login", function(req, res) {
    LoginInfo.find({username: req.body.username, password: req.body.password}).then(function(_accountInfo) {
        if(_accountInfo.length > 0) {
            console.log(`Account Found: Username:${_accountInfo[0].username} & Name:${_accountInfo[0].displayName}`);
            res.json({ result: "Success", username: _accountInfo[0].username, name: _accountInfo[0].displayName});
        }
        else{
            res.json({ result: "Fail", error: 'Username or Password is incorrect.' });
        }
    })
})

// General
app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})