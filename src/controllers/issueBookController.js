const express = require('express')
const IssueBook=require('../models/Issueebook');
const Book=require('../models/Book');

issueBook=async(req,res)=>{
    try {
        const {bookId, bookName, studentName, issueDate, returnDate, status} = req.body;
        const book = await Book.findById(bookId);

        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        if(!student){
            return res.status(404).json({message: "Student not found"});

        }
        if(book.quantity<1){
            return res.status(400).json({message: "Book is not available"});
        }
        const newIssueBook = new IssueBook({
            bookId,
            bookName,
            studentName,
            issueDate,
            returnDate,
            status:"Issued"
        });
        await newIssueBook.save()
        book.quantity -=1;
        await book.save();
        
        res.status(201).json({message: "Book issued successfully", data: newIssueBook});


        
    } catch (error) {
        res.status(500).json({message: error.message});

        
    }
}

returnBook= async (req,res)=>{
    try {
        const {issueBookId} = req.body;
        const issueBook = await IssueBook
         .findById(issueBookId);

        if(!issueBook){
            return res.status(404).json({message: "Issued book record not found"});
        }
        const book = await Book.findById(issueBook.bookId);
        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        issueBook.status = "Returned";
        await issueBook.save();
        book.quantity +=1;
        await book.save();
        
        res.status(200).json({message: "Book returned successfully", data: issueBook});


    }
    catch (error) {
        res.status(500).json({message: error.message});

    }
}
module.exports={issueBook, returnBook};
