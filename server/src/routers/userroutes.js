import express from 'express'
import { getUser, getAllUsers, updateUser,deleteUser, getAllUserNames} from '../controllers/userController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../auth/verifyToken.js';

const router= express.Router();


router.get('/singleuser/:id',verifyAdmin,  getUser);
router.get('/',verifyAdmin, getAllUsers);
router.get('/allusernames',verifyAdmin, getAllUserNames);
router.put('/:id',verifyAdmin,updateUser);
router.delete('/:id',verifyAdmin,deleteUser);

export default router;