import { Author } from "../../../db/index.js";

//POST request to create a new author.
export const createAuthor = async (req, res,next) => {
    try{
        const {name,bio,birthDate,books} = req.body
        const authorExist=await Author.findOne({name})
        if(authorExist){
            throw new Error("author already exist",{cause : 400})
        }
        const author = new Author({name,bio,birthDate,books})
        await author.save()
        return res.status(200).json({message:"author created successfully",success:true,data:author})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }

}

// GET request to retrieve all authors.
export const getAllAuthors = async (req, res,next) => {
    try{
        const authors = await Author.find()
        return res.status(200).json({message:"authors fetched successfully",success:true,data:authors})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}

//GET request to retrieve a single author by its ID.
export const getAuthorById = async (req, res,next) => {
    try{
        const{id} = req.params
        const author = await Author.findById(id)
        if(!author){
            throw new Error("author not found",{cause : 404})
        }
        return res.status(200).json({message:"author fetched successfully",success:true,data:author})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
}
}


// PATCH request to update an author by its ID.
export const updateAuthorById = async (req, res,next) => {
    try{
        const{id} = req.params
        const {name,bio,birthDate,books} = req.body
        const updatedAuthor = await Author.findByIdAndUpdate(id,{name,bio,birthDate,books},{new:true})
        if(!updatedAuthor){
            throw new Error("author not found",{cause : 404})
        }
        return res.status(200).json({message:"author updated successfully",success:true,data:updatedAuthor})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}
// DELETE request to delete an author by its ID.
export const deleteAuthorById = async (req, res,next) => {
    try{
        const{id} = req.params
        const deletedAuthor = await Author.findByIdAndDelete(id)
        if(!deletedAuthor){
            throw new Error("author not found",{cause : 404})
        }
        return res.status(200).json({message:"author deleted successfully",success:true,data:deletedAuthor})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}