import { Router } from "express";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "./book.controller.js";
const bookRouter = Router();



bookRouter.post('/create', createBook)
bookRouter.get('/',getAllBooks)
bookRouter.get('/get/:id',getBookById)
bookRouter.patch('/update/:id',updateBookById)
bookRouter.delete('/delete/:id',deleteBookById)
export{bookRouter}