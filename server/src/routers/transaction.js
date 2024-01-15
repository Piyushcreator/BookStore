import express from 'express'
import {addTransaction, getTransaction, getAllTransactions, updateTransaction, deleteTransaction, getAllTransactionsUser} from '../controllers/transactionController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../auth/verifyToken.js';

const router= express.Router();

router.post('/add', verifyAdmin, addTransaction);
router.get('/:id', verifyUser,getTransaction);
router.get('/',verifyUser,getAllTransactions);
router.get('/user/:id',verifyAdmin,getAllTransactionsUser);
router.put('/:id',verifyAdmin, updateTransaction);
router.delete('/:id',verifyAdmin, deleteTransaction);

export default router;