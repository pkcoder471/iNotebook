const User = require('../models/User')


module.exports.createUser = async function(req,res){ 
    const user = await User(req.body);
    user.save();
    res.send(req.body);

};