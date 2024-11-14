import express from 'express';
import { addBookController, getBooksController, getDetailBookController } from './controller/bookController.js';

const router = express.Router();

router.post('/books', addBookController);
router.get('/books/:page/:limit', getBooksController);
router.get('/books/:id', getDetailBookController);
export default router;
