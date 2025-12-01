const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/libraryDB' , );
const db= mongoose.connection;

db.on('connected' , ()=>{

    console.log('Database connected successfully');
});

db.on('error' , (err)=>{
    console.log('Database connection error: ' + err);
});

module.exports= db;



