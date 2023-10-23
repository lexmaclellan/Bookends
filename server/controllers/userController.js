const asyncHandler = require('express-async-handler')
const { User } = require('../models')

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.status(401)
    throw new Error('Failed to authenticate user.')
    res.status(200).json({ message: 'Auth User' })
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Register User' })
})

module.exports = {
    authUser,
    registerUser
}