import Book from "../bookModels.js";

export const addBook = async (bookData) => {
    try {
        if (!bookData.title || !bookData.author || !bookData.publicationYear) {
          throw new Error('Tous les champs (titre, auteur, année de publication) sont requis.');
        }
    
        const newBook = new Book(bookData);
        await newBook.save();
        return newBook;
      } catch (error) {
        throw new Error('Erreur lors de l\'ajout du livre: ' + error.message);
      }
};

export const getBooks = async (page , limit) => {
    try {
        const skip = (page - 1) * limit;
        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments();
        return { books, totalBooks };
      } catch (error) {
        throw new Error('Erreur lors de la récupération des livres: ' + error.message);
      }
};

export const getDetailBook = async (id) => {
  try {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error('Livre non trouvé');
    }
    return book;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de ce livre : ' + error.message);
  }
};