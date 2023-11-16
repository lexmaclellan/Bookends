const router = require('express').Router()
const ROLES = require('../../config/roles')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyJWT = require('../../middleware/verifyJWT')

const {
    authUser,
    registerUser,
    handleRefreshToken,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    addRole,
    removeRole
} = require ('../../controllers/userController')

router.route('/').get(getUsers).post(registerUser)
router.route('/auth').post(authUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/refresh').get(handleRefreshToken)
router.route('/logout').post(logoutUser)
router.route('/:userID').get(getOneUser).put(updateUser).delete(deleteUser)
router.route('/:userID/roles').put(addRole).delete(removeRole)

module.exports = router