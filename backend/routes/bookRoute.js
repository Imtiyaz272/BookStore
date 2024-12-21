import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();


//Route for saving a new book 
router.post('/', async (req, res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send(
                {message: "All fields are required"}
            )
        }

        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(200).send(book);
    } catch (error) {
        console.log(error);
        res.status(400).send({message:error.message});
    }
});

// Get all books from DB
router.get('/', async(req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data : books
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({message : error.message});
    }
});

//Route for getting one book from DB by id
router.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(400).send({message : error.message});
    }
});

//Route for update a book
router.put('/:id', async (req, res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:'All fields are required'
            })
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result)
            return res.status(400).json({message:'Book not found'});

        return res.status(200).send({message:'Book updated successfully'});

    } catch (error) {
        console.log(error);
        res.status(400).send({message : error.message});
    }
}); 

//Route for deleting a book 
router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({
                message:'Book id is required'
            })
        }
        const result = await Book.findByIdAndDelete(id);
        if(!result)
            return res.status(400).json({message:'Book not found'});

        return res.status(200).send({message:'Book deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(400).send({message : error.message});
    }
});

export default router;