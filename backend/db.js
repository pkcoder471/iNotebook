const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://pklid471:prateek471@cluster0.5isng2k.mongodb.net/inotebook?retryWrites=true&w=majority";


const connectTOMongo =()=>{

    mongoose.connect(mongoURI,()=>{
        console.log("Conncected to Mongo Successfully");
    })
     
}


module.exports= connectTOMongo;
