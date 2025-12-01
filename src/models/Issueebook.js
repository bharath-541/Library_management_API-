const mongoose = require('mongoose');
const Book = require('./Book');

const issueEbookSchema = new mongoose.Schema({  
    bookId:{
        type: String, 
        required: true
    },
    bookName:{
        type: String,
        required: true
    },
    studentName:{
        type: String,
        required: true
    },
    issueDate:{
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['Issued' , 'Returned' ],
        default: 'Issued'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


const IssueBook=new mongoose.model('IssueBook' , issueEbookSchema);

module.exports= IssueBook ;
