var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    displayName:{
        type:String,
        require:true
    }
});
    /* This is the collection name */
mongoose.model("logins", Schema);