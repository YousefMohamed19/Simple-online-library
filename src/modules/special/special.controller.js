import { Author, Book } from "../../../db/index.js";

//• Add pagination to the GET endpoints for retrieving all books and authors.
//• Implement search functionality to filter books by title or author, and authors by name or bio.
//• Add a relationship so that when retrieving an author, the response includes a list of books written by them.

export const getAuthors = async (req, res,next) => {

    try {
        const { page = 1, limit = 10,search=''} = req.query;

  const searchQuery = {
    $or:[
        {name: { $regex: search, $options: 'i' }},
        { bio: { $regex: search, $options: 'i' } },
    ]
  };

    const authors = await Author.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('books')
      .exec();

    const count = await Author.countDocuments(searchQuery);

    res.status(200).send({
      authors,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
    }catch (err) {
        res.status(500).json({message:err.message});
    }
}


export const getBooks = async(req,res,next)=>{
    try{
        const {page=1,limit=10,search=''}=req.query
        const searchQuery={
            $or:[
                {title:{$regex:search,$options:'i'}},
                {author:{$regex:search,$options:'i'}},
            ]
        }
        const books = await Book.find(searchQuery).limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('author')
        .exec();
        const count = await Book.countDocuments(searchQuery)
        res.status(200).send({
            books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}



export const getAuthorWithBooks = async (req, res,next) => {
    try{
        const{id} = req.params
        const author = await Author.findById(id).populate('books')
        if(!author){
            throw new Error("author not found",{cause : 404})
        }
        
        return res.status(200).json({message:"author fetched successfully",success:true,data:{author}})
    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
}
}