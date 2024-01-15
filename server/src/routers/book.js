import express from 'express'
import {addBook, getBook,updateBook,getAllBooks,deleteBook, getAllBookNames} from '../controllers/bookController.js'
import { verifyAdmin, verifyUser } from '../auth/verifyToken.js';

const router= express.Router();

router.post('/add',verifyAdmin, addBook);
router.get('/singleuser/:id',verifyUser, getBook);
router.get('/',verifyUser, getAllBooks);
router.get('/allbooknames',verifyAdmin, getAllBookNames);
router.put('/:id',verifyAdmin, updateBook);
router.delete('/:id',verifyAdmin, deleteBook);

export default router;