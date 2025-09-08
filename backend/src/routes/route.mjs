import express from 'express';
import { loginUser, registerUser, updateUser,getProfile } from '../controllers/userController.mjs';
import { authentication, authorization } from '../auth/authentication.mjs';
import { getBook,createBook } from '../controllers/bookController.mjs';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/notesController.mjs';

const router = express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile/:id',authentication,authorization,getProfile);
router.put('/update',authentication,authorization,updateUser);
router.get('/book',getBook);
router.post('/createbook',createBook);
router.get('/notes',authentication,getNotes);
router.post('/createNote',authentication,createNote);
router.put('/updateNote/:id',updateNote);
router.delete('/deleteNote/:id',deleteNote);


export default router;