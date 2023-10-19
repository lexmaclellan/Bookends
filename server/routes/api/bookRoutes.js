const router = require('express').Router()

const {
    getAllBooks,
    getOneBook,
    createBook
} = require('../../controllers/bookController')

router.route('/').get(getAllBooks).post(createBook)
router.route('/:bookID').get(getOneBook)

module.exports = router