const { Types } = require('mongoose')
const { Book } = require('../models')

module.exports = {

    async getAllBooks(req, res) {
        try {
            const books = await Book.find()

            res.status(200).json({
                count: books.length,
                data: books
            })
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    async getOneBook(req, res) {
        try {
            const newBook = new Types.ObjectId(req.params.bookID)
            const book = await Book.findById(newBook)
           
            if (!book) {
                return res.status(404).json({ message: 'No book found with that ID.'})
            }

           return res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    async createBook(req, res) {
        try {
            if (
                !req.body.title || 
                !req.body.author || 
                !req.body.publishedYear
            ) {
                return res.status(400).json({ message: 'Send all required fields: title, author, publishedYear' })
            }
            
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishedYear: req.body.publishedYear
            }
            console.log(newBook)
            const book = await Book.create(newBook)
            return res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}