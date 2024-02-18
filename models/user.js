const mongoose = require('mongoose');
const Joi= require('joi');
const jwt= require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    isAdmin:Boolean,
})

userSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.SECRET_KEY)
    return token;
}

const validateUser=(user)=>{
    const schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}
const User=mongoose.model("User",userSchema);

exports.User=User;
exports.validateUser=validateUser;
