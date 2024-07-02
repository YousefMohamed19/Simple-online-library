import { Router } from "express";
import { createAuthor, deleteAuthorById, getAllAuthors, getAuthorById, updateAuthorById } from "./author.controller.js";
const authorRouter = Router();


authorRouter.post('/create', createAuthor)
authorRouter.get('/',getAllAuthors)
authorRouter.get('/get/:id',getAuthorById)
authorRouter.patch('/update/:id',updateAuthorById)
authorRouter.delete('/delete/:id',deleteAuthorById)
export{authorRouter}