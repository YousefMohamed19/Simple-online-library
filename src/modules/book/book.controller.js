import {Book} from '../../../db/index.js'
// POST request to create a new book.
export const createBook = async (req, res,next) => {
   try{
    const {title,content,author,publishedDate} = req.body
    const bookExists = await Book.findOne({title})
    if(bookExists){
        throw new Error('Book already exists',{cause:409})
    }
    const createdBook = new Book({title,content,author,publishedDate})
    await createdBook.save()
    res.status(201).json({message:'Book created successfully',success:true,data:createdBook})
   }catch(err){
    res.status(err.cause||500).json({message:err.message,success:false})
   }
}


//GET request to retrieve all books.
export const getAllBooks = async (req, res,next) => {
    try {
        const books = await Book.find()
        res.status(200).json({message:'Books retrieved successfully',success:true,data:books})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}

// GET request to retrieve a single book by its ID.
export const getBookById = async (req, res,next) => {
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        if(!book){
            throw new Error('Book not found',{cause:404})
        }
        res.status(200).json({message:'Book retrieved successfully',success:true,data:book})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}


//PATCH request to update a book by its ID.
export const updateBookById = async (req, res,next) => {
    try{
        const {id} = req.params
        const {title,content,author,publishedDate} = req.body
        const updatedBook = await Book.findByIdAndUpdate(id,{title,content,author,publishedDate},{new:true})
        if(!updatedBook){
            throw new Error('Book not found',{cause:404})
        }
        res.status(200).json({message:'Book updated successfully',success:true,data:updatedBook})  
    }catch(err){}


}

//DELETE request to delete a book by its ID.
export const deleteBookById = async (req, res,next) => {
    try{
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)
        if(!book){
            throw new Error('Book not found',{cause:404})
        }
        res.status(200).json({message:'Book deleted successfully',success:true,data:book})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}