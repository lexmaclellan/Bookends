const { Types } = require('mongoose')
const { Book } = require('../models')

module.exports = {

    // @desc    Get all books
    // route    GET /api/books
    // @access  Public
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

    // @desc    Get one book
    // route    GET /api/books/:bookID
    // @access  Public
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

    // @desc    Add new book
    // route    POST /api/books
    // @access  Public
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
            
            const book = await Book.create(newBook)

            return res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    // @desc    Update a book
    // route    PUT /api/books/:bookID
    // @access  Public
    async updateBook(req, res) {
        try {
            if (
                !req.body.title || 
                !req.body.author || 
                !req.body.publishedYear
            ) {
                return res.status(400).json({ message: 'Send all required fields: title, author, publishedYear' })
            }

            const updatedBook = new Types.ObjectId(req.params.bookID)
            const book = await Book.findByIdAndUpdate(
                updatedBook,
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!book) {
                return res.status(404).json({ message: 'No book found with that ID.'})
            }

            return res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    // @desc    Delete a book
    // route    DELETE /api/books/:userID
    // @access  Public
    async deleteBook(req, res) {
        try {
            const deletedBook = new Types.ObjectId(req.params.bookID)
            const book = await Book.findByIdAndDelete(deletedBook)

            if (!book) {
                return res.status(404).json({ message: 'No book found with that ID.'})
            }

            return res.status(200).json({ message: 'Book deleted.' })
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}