const mongoose =require('mongoose');
const bcrypt = require("bcryptjs")

const student= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },

    prn:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobilno:{
        type:String,
        required:true
    },

    branch:{
        type:String
    },
    classl:{
        type:String
    },
    add:{
        type:String
    },
    password:{
        type:String,
        required:true
    },

})
console.log("chek1")

student.pre("save",async function(next){
    if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10)
    }
    next();
})
const Register=new mongoose.model("Ashish",student);
module.exports=Register;
