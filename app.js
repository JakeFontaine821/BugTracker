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
    res.redirect("index.html?page=0");
})

// Signup
app.post("/signup", function(req, res){
    LoginInfo.find({username: req.body.username}).then((log) => {
        if(log.length > 0) {
            // change username
        }
        else{
            // save login info
        }
    })
})

// new LoginInfo(req.body).save().then(function(){
    //     res.redirect("index.html");
    // })

// General
app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})