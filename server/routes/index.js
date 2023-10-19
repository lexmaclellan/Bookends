const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes)
router.use((req, res) => res.send('The API route you tried to call does not exist.'))

module.exports = router