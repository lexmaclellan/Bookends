const { User } = require('../models')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

function createToken(_id) {
    const token = jwt.sign({_id}, process.env.SECRET, { expiresIn: '30d' })

    if(!token) {
        throw new Error('Failed to create jsonwebtoken.')
    }
    return token
}

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.login(email, password)

    if (user) {
        const token = createToken(user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.register(name, email, password)

    if (user) {
        const token = createToken(user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout User' })
})

// @desc    Get all users
// route    GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    const usersList = []
    for (let i = 0; i < users.length; i++) {
        usersList.push({
            _id: users[i]._id,
            name: users[i].name,
            email: users[i].email,
            createdAt: users[i].createdAt,
            updatedAt: users[i].updatedAt
        })
    }
    res.status(200).json({
        count: usersList.length,
        data: {
            usersList
        }
    })
})

// @desc    Get one user
// route    GET /api/users/:userID
// @access  Private
const getOneUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get One User' })
})

// @desc    Update user
// route    PUT /api/users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User' })
})

// @desc    Delete user
// route    DELETE /api/users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Delete User' })
})

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser
}