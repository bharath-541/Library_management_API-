const express = require('express');
require('dotenv').config();
const bookRouter = require('./src/routes/BookRouter');
const issueBookRouter=require('./src/routes/issueBookRouter')
const app = express();

app.use(express.json());




requestlogger = (req,res , next )=>{
    console.log(req);
    console.log(`${req.method} ${req.path} ${new Date().toISOString()}`);
    next();
} ; 


app.get('/' , (request , response)=>{
    console.log('Welcome to the Library Management API');
})

app.get('/health' , (request , response)=>{
    response.status(200).json({
        status: 'OK',
        message : "Server is Running Successfully"
    });
});

app.use(requestlogger);
app.use('/books/' , bookRouter);
app.use('/issueBooks/' , issueBookRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    
}) 

