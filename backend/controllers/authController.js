const User = require('../models/User')
const {validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

module.exports.createUser = async function(req,res){
    try{
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email'})})
    res.json({user});
    } catch(err){
        console.log(err);
        res.status(500).send("Some Error occured");
    }
};