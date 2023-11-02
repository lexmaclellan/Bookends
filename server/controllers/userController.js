const { User } = require('../models')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const cookieOptions = {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 * 3
}

function createAccessToken(_id) {
    const token = jwt.sign(
        {_id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
    )

    if(!token) {
        throw new Error('Failed to create jsonwebtoken.')
    }
    return token
}

function createRefreshToken(_id) {
    const token = jwt.sign(
        {_id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '3d' }
    )

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
        const accessToken = createAccessToken(user._id)
        const refreshToken = createRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        res.cookie('jwt', refreshToken, cookieOptions)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            accessToken: accessToken
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
    const { email, password, roles } = req.body
    const user = await User.register(email, password, roles)

    if (user) {
        const accessToken = createAccessToken(user._id)
        const refreshToken = createRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        res.cookie('jwt', refreshToken, cookieOptions)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            accessToken: accessToken
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc    Handle refresh token
// route    GET /api/users/refresh
// @access  Public
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken })
    if (!user) return res.sendStatus(403).json({ message: 'No user found with that refresh token' })
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user._id.toString() !== decoded._id) return res.sendStatus(403).json({ message: 'Unable to verify JWT' })
            const accessToken = createAccessToken(user._id)
            res.json({ accessToken })
        }
    )
})

// @desc    Logout user
// route    GET /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken })
    if (!user) {
        res.clearCookie('jwt', cookieOptions)
        return res.sendStatus(204)
    }

    user.refreshToken = ''
    await user.save()
    
    res.clearCookie('jwt', cookieOptions)

    res.status(204).json({ message: 'User logged out' })
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
            roles: users[i].roles,
            refreshToken: users[i].refreshToken,
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
    const user = await User.findById(req.params.userID)

    if (user) {
        const userList = []
        userList.push({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            refreshToken: users[i].refreshToken,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
        res.status(200).json(userList)
    } else {
        res.status(404)
        throw new Error('No user found with that ID.')
    }
})

// @desc    Update user
// route    PUT /api/users/:userID
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User' })
})

// @desc    Delete user
// route    DELETE /api/users/:userID
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Delete User' })
})

// @desc    Add role to user
// route    PUT /api/users/:userID/roles
// @access  Private
const addRole = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.userID,
        { $addToSet: { roles: req.body } },
        { runValidators: true, new: true }
    )

    if (user) {
        res.status(200).json({ message: 'Role added successfully.' })
    } else {
        res.status(404)
        throw new Error('No user found with that ID.')
    }
})

// @desc    Remove role from user
// route    PUT /api/users/:userID/roles
// @access  Private
const removeRole = asyncHandler(async (req, res) => {

})

module.exports = {
    authUser,
    registerUser,
    handleRefreshToken,
    logoutUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    addRole,
    removeRole
}