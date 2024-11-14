import { addBook, getBooks, getDetailBook } from "../service/bookService.js";

export const addBookController = async (req, res) => {
  try {
    const book = await addBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooksController = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const {books, totalBooks} = await getBooks(page, limit);
    res.status(200).json({books , totalBooks});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetailBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getDetailBook(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

