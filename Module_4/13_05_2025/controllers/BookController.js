const book = require('../models/Book.js')

exports.getBooks = (req, res) => {
  try {
    const allBooks = book.getAllBooks();
    res.json(allBooks);
  } catch (e) {
    console.error(e);
  }
};

exports.getBookById = (req, res) => {
  try {
    console.log(req);
    const id = parseInt(req.params.id);
    const result = book.getBookByBookId(id);
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Book not found"})
    }

    res.json(result);
  } catch (e) {
    console.error(e);
  }
};