const { User } = require('../models')
const asyncHandler = require('../middleware/asyncHandler')
const jwt = require('jsonwebtoken')

const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 24 * 60 * 60 * 1000 * 3
}

function createAccessToken(_id, roles) {
    const token = jwt.sign(
        {
            'UserInfo': {
                '_id': _id,
                'roles': roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
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

// @desc    Auth user/set & get token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.login(email, password)

    if (user) {
        const accessToken = createAccessToken(user._id, user.roles)
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
        const accessToken = createAccessToken(user._id, user.roles)
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
            const accessToken = createAccessToken(decoded._id, user.roles)
            res.json({ accessToken })
        }
    )
})

// @desc    Logout user / clear cookie
// route    POST /api/users/logout
// @access  Private
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

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})

// @desc    Get all users
// route    GET /api/users
// @access  Private/Admin
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
// @access  Private/Admin
const getOneUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userID)

    if (user) {
        const userList = []
        userList.push({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            refreshToken: user.refreshToken,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
        res.status(200).json(userList)
    } else {
        res.status(404)
        throw new Error('No user found with that ID.')
    }
})

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User' })
})

// @desc    Delete user
// route    DELETE /api/users/:userID
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Delete User' })
})

// @desc    Add role to user
// route    PUT /api/users/:userID/roles
// @access  Private/Admin
const addRole = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.userID,
        { $set: { roles: req.body } },
        { new: true }
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
// @access  Private/Admin
const removeRole = asyncHandler(async (req, res) => {

})

module.exports = {
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
}