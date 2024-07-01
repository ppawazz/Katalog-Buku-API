const Book = require("../models/BookModels");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      payload: books,
      message: "successfully getting book",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postBook = async (req, res) => {
  upload.single("cover")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { title, author, publisher, pages } = req.body;
    const cover = req.file.path;

    try {
      const newBook = new Book({
        cover,
        title,
        author,
        publisher,
        pages,
      });

      const savedBook = await newBook.save();
      res.status(200).json({
        success: true,
        payload: savedBook,
        message: "succesfully added book",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
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
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({
      message: "Book deleted successfully",
      success: true,
      payload: null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBook,
  postBook,
  getBookById,
  updateBook,
  deleteBook,
};
