const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController')

//endpoints
router.get('/', bookController.getBooks);
router.get('/book_title/:title', bookController.getBookByBookTitle);
router.get('/book_author/:author', bookController.getBookByBookAuthor);
router.get('/book_ranking/:ranking', bookController.getBooksByRanking);


module.exports = router;