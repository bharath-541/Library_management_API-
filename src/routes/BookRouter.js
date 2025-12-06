const express = require('express');
const {
  getAllbooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/Bookcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllbooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
