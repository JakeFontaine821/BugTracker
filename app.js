var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.port||3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//example routes
app.get("/", function(req, res){
    res.redirect("index.html");
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})