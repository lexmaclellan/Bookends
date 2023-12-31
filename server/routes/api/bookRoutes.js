const router = require('express').Router()
const { protect, admin } = require('../../middleware/authMiddleware')

const {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
} = require('../../controllers/bookController')

router.route('/').get(getAllBooks).post(createBook)
router.route('/:bookID').get(getOneBook).put(updateBook).delete(deleteBook)

module.exports = router