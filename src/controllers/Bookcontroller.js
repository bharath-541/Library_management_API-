const Book = require('../models/Book');

const getAllbooks = async (request, response) => {
  try {
    const books = await Book.find();
    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getBookById = async (request, response) => {
  try {
    const foundBook = await Book.findById(request.params.id);
    if (!foundBook) {
      return response.status(404).json({ message: 'Book Not Found' });
    }
    response.status(200).json(foundBook);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const createBook = async (request, response) => {
  try {
    if (request.user.role === 'STUDENT') {
      return response
        .status(403)
        .json({ message: 'You are not authorized to create a book' });
    }

    const { title, author, publishedYear, price, quantity } = request.body;

    if (!title || !author || !publishedYear || !price || !quantity) {
      return response
        .status(400)
        .json({ message: 'Please Provide all the Required Feilds' });
    }

    const newbook = new Book({
      title,
      author,
      publishedYear,
      price,
      quantity,
      status: 'Available',
    });

    await newbook.save();
    response
      .status(201)
      .json({ message: 'Book Created Successfully', data: newbook });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const updateBook = async (request, response) => {
  try {
    if (request.user.role === 'STUDENT') {
      return response
        .status(403)
        .json({ message: 'You are not authorized to update a book' });
    }

    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!book) {
      {
        return response.status(404).json({ message: 'Book Not Found' });
      }
    }

    const { title, author, publishedYear, price, quantity } = request.body;

    if (!title || !author || !publishedYear || !price || !quantity) {
      return response
        .status(400)
        .json({ message: 'Please Provide all  field to update' });
    }

    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    book.price = price;
    book.quantity = quantity;
    response
      .status(200)
      .json({ message: 'Book Updated Successfully', data: book });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deleteBook = async (request, response) => {
  try {
    if (request.user.role === 'STUDENT') {
      return response
        .status(403)
        .json({ message: 'You are not authorized to delete a book' });
    }

    const deletedBook = await Book.findByIdAndDelete(request.params.id);

    if (!deletedBook) {
      return response.status(404).json({ message: 'Book Not Found' });
    }
    response.status(200).json({ message: 'Book Deleted Successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllbooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
