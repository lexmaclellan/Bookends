const { Schema, model } = require('mongoose')
const reviewSchema = require('./Review')

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
        coverURL: {
            type: String
        },
        description: {
            type: String
        },
        publishedYear: {
            type: Number,
            required: true
        },
        /*categories: {

        },*/
        standardPrice: {
            type: Number,
            required: true
        },
        salePrice: {
            type: Number,
        },
        rating: {
            type: Number
        },
        reviews: [reviewSchema],
        numInStock: {
            type: Number,
            required: true,
            default: 0
        },
        numSold: {
            type: Number,
            require: true,
            default: 0
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

bookSchema.virtual('numReviews').get(function () {
    return this.reviews.length
})

const Book = model('Book', bookSchema)

module.exports = Book