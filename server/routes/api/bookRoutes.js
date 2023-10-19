const router = require('express').Router()

const {
    getAllBooks,
    createBook
} = require('../../controllers/bookController')

router.route('/').get(getAllBooks).post(createBook)

module.exports = router