const router = require('express').Router()
const { protect, admin } = require('../../middleware/authMiddleware')

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

router.route('/').get(protect, admin, getUsers).post(registerUser)
router.route('/auth').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/refresh').get(protect, handleRefreshToken)
router.route('/logout').post(protect, logoutUser)
router.route('/:userID').get(protect, admin, getOneUser).put(protect, admin, updateUser).delete(protect, admin, deleteUser)
router.route('/:userID/roles').put(protect, admin, addRole).delete(protect, admin, removeRole)

module.exports = router