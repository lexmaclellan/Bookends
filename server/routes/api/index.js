const router = require('express').Router()
const bookRoutes = require('./bookRoutes')
const orderRoutes = require('./orderRoutes')
const userRoutes = require('./userRoutes')

router.use('/books', bookRoutes)
router.use('/orders', orderRoutes)
router.use('/users', userRoutes)

module.exports = router