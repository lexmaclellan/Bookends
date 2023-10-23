const router = require('express').Router()

const {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser
} = require ('../../controllers/userController')

router.route('/').get(getUsers).post(registerUser)
router.route('/:userID').get(getOneUser).put(updateUser).delete(deleteUser)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)

module.exports = router