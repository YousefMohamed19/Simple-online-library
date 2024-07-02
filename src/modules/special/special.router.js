import { Router } from "express";
import { getAuthorWithBooks, getAuthors, getBooks } from "./special.controller.js";
const specialRouter = Router();
  

specialRouter.get('/author',getAuthors)
specialRouter.get('/book',getBooks)
specialRouter.get('/get/:id',getAuthorWithBooks)


export { specialRouter }