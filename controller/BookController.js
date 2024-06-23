const Book = require("../models/BookModels");

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.status(200).json({
      success: true,
      payload: books,
      message: "successfully getting book",
    }); // Send the books as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

const postBook = async (req, res) => {
  const { cover, title, author, publisher, pages } = req.body;

  try {
    const newBook = new Book({
      cover,
      title,
      author,
      publisher,
      pages,
    });

    const savedBook = await newBook.save(); // Save the new book to the database
    res.status(200).json({
      success: true,
      payload: savedBook,
      message: "succesfully added book",
    }); // Send the saved book as JSON response with status code 201 (Created)
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      payload: book,
      message: "Successfully retrieved book",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      payload: updatedBook,
      message: "Successfully updated book",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId); // Find and delete book by ID in the database
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({
      message: "Book deleted successfully",
      success: true,
      payload: null,
    }); // Send success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

module.exports = {
  getAllBook,
  postBook,
  getBookById,
  updateBook,
  deleteBook,
};
