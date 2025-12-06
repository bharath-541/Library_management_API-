const IssueBook = require('../models/Issueebook');
const Book = require('../models/Book');
const User = require('../models/Users');

const issueBook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to issue a book' });
    }

    const { bookId, studentId, issueDate, returnDate } = req.body;

    if (!bookId || !studentId || !issueDate || !returnDate) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.role !== 'STUDENT') {
      return res.status(400).json({ message: 'User is not a student' });
    }

    if (book.quantity < 1) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    const newIssueBook = new IssueBook({
      bookId,
      bookName: book.title,
      studentId,
      studentName: student.name,
      issueDate,
      returnDate,
      status: 'Issued',
    });
    await newIssueBook.save();
    book.quantity -= 1;
    await book.save();

    res
      .status(201)
      .json({ message: 'Book issued successfully', data: newIssueBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to return a book' });
    }

    const { issueBookId } = req.body;
    const issueBook = await IssueBook.findById(issueBookId);

    if (!issueBook) {
      return res.status(404).json({ message: 'Issued book record not found' });
    }
    const book = await Book.findById(issueBook.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    issueBook.status = 'Returned';
    await issueBook.save();
    book.quantity += 1;
    await book.save();

    res
      .status(200)
      .json({ message: 'Book returned successfully', data: issueBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { issueBook, returnBook };
