const mongoose = require('mongoose');

const issueEbookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Issued', 'Returned'],
    default: 'Issued',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const IssueBook = new mongoose.model('IssueBook', issueEbookSchema);

module.exports = IssueBook;
