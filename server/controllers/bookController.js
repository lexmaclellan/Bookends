const { Book } = require('../models')

module.exports = {

    async getAllBooks(req, res) {
        try {
            const books = await Book.find()
            res.json(books)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createBook(req, res) {
        try {
            if (
                !req.body.title || 
                !req.body.author || 
                !req.body.publishedYear
            ) {
                return res.status(400).json('Send all required fields: title, author, publishedYear')
            }
            
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishedYear: req.body.publishedYear
            }
            console.log(newBook)
            const book = await Book.create(newBook)
            return res.json(book)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}