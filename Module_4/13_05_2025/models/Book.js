
const books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "1984", author: "George Orwell" },
];

const getAllBooks = () => {
  return books;
};

const getBookByBookId = (id) => {
  return books.find(book => book.id === id);
};

module.exports = { getAllBooks, getBookByBookId };
