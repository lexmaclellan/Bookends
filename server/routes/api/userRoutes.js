const router = require('express').Router()
const verifyJWT = require('../../middleware/verifyJWT')

const {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    addRole,
    removeRole
} = require ('../../controllers/userController')

router.route('/').get(getUsers).post(registerUser)
router.route('/:userID').get(getOneUser).put(verifyJWT, updateUser).delete(verifyJWT, deleteUser)
router.route('/:userID/roles').put(verifyJWT, addRole).delete(verifyJWT, removeRole)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)

module.exports = router