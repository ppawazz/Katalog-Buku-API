const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { connectDB } = require("./config/db");
const app = express();
const port = process.env.PORT;
const Book = require("./models/BookModels");
const {
  getAllBook,
  postBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("./controller/BookController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get(
  "/testing",
  (test = (req, res) => {
    res.send("test berhasil");
  })
);

app.get("/books", getAllBook);
app.post("/books/addbooks", postBook);
app.get("/books/:id", getBookById);
app.put("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
