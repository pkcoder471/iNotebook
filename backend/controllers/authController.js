const User = require('../models/User')
const {validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "blahsomething";
module.exports.createUser = async function(req,res){
    
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try{
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error: "sorry a user with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: pass,
      })
      
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
   
    res.json({authToken});
    } catch(err){
        console.log(err);
        res.status(500).send("Some Error occured");
    }
};

module.exports.login = async function(req,res){

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error: "Please try to login with correct password"});
        }

        const passwordCompare = bcrypt.compare(password,user.password);

        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({authToken});


    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}


module.exports.getuser= async function(req,res){

    

    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        res.send(user);
        
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}