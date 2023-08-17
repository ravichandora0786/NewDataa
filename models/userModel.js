const mongoose = require("mongoose"); 

const userSchema =new mongoose.Schema({
    id:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    is_admin:{
        type: Number,
        required: true
    },
    is_varified:{
        type: Number,
        default: 1
     }
});

module.exports = mongoose.model("User",userSchema);