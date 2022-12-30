const Note = require('../models/Notes');
const {validationResult } = require('express-validator');




module.exports.fetchallnotes = async function(req,res){
    try{
    const notes = await Note.find({user:req.user.id});
    res.json(notes);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.addnote = async function(req,res){
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title,description,tag} =req.body;

    try{

    const note = new Note({
        title,description,tag,user:req.user.id
    });
    const savedNote = await note.save();

    res.json(savedNote);

    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}