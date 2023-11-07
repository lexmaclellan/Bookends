const { Schema, model } = require('mongoose')

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishedYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
        id: false
    }
)

const Book = model('Book', bookSchema)

module.exports = Book