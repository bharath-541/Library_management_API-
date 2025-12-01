const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://pernibharath15:pernibharath15@inscluster.hgsenvh.mongodb.net/?appName=InsCluster' , );
const db= mongoose.connection;

db.on('connected' , ()=>{

    console.log('Database connected successfully');
});

db.on('error' , (err)=>{
    console.log('Database connection error: ' + err);
});

module.exports= db;



