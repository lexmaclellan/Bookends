const router = require('express').Router()

const {
    authUser
} = require ('../../controllers/userController')

router.route('/auth').post(authUser)

module.exports = router