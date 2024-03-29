const {User} = require('../models/user');
const Joi = require('joi');
const _=require("lodash");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Invalid email or password!');
    }
  
    const isValid=await bcrypt.compare(req.body.password,user.password)
    if(!isValid){
        return res.status(400).send('Invalid email or password!');
    }

    const token=user.generateToken();
    res.send(token);
});



const validate=(req)=>{
    const schema={
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req,schema);
}
module.exports = router;