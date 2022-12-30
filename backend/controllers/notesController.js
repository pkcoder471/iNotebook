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

module.exports.updatenote = async function(req,res){
    
    const {title,description,tag} = req.body;

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    try{
       
    let note = await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")};
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("unauthorized");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
    

    res.json(note);

    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports.deletenote = async function(req,res){
    
    

    try{
       
    let note = await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")};
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("unauthorized");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    

    res.json({msg:"Success Note has been deleted"});

    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}