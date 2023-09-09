const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully', data: newUser });
});

public_users.get('/', async (req, res) => {
  try {
    return res.status(200).json({ message: books });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    if (books.hasOwnProperty(isbn)) {
      resolve(books[isbn]);
    } else {
      reject(new Error('Book not found'));
    }
  })
  .then(book => {
    return res.status(200).json({ message: 'Book retrieved successfully', data: book });
  })
  .catch(error => {
    return res.status(404).json({ message: 'Book not found' });
  });
});

public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  const matchingBooks = [];

  try {
    for (const bookId in books) {
      if (books.hasOwnProperty(bookId) && books[bookId].author === author) {
        matchingBooks.push({ id: bookId, ...books[bookId] });
      }
    }

    if (matchingBooks.length > 0) {
      return res.status(200).json({ message: 'Books retrieved successfully', data: matchingBooks });
    } else {
      return res.status(404).json({ message: 'No books found for the author' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  const matchingBooks = [];

  try {
    for (const bookId in books) {
      if (books.hasOwnProperty(bookId) && books[bookId].title === title) {
        matchingBooks.push({ id: bookId, ...books[bookId] });
      }
    }

    if (matchingBooks.length > 0) {
      return res.status(200).json({ message: 'Books retrieved successfully', data: matchingBooks });
    } else {
      return res.status(404).json({ message: 'No books found for the title' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

public_users.get('/review/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  try {
    if (books.hasOwnProperty(isbn)) {
      const book = books[isbn];
      const review = book.reviews;
      return res.status(200).json({ message: 'Review retrieved successfully', data: review });
    } else {
      return res.status(404).json({ message: 'Book/Review not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports.general = public_users;
