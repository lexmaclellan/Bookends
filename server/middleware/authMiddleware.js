const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/User')
const ROLES = require('../config/roles')

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            req.user = await User.findById(decoded._id).select('-password')
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Token failed to returned.')
        }
    } else {
        res.status(401)
        throw new Error('Authorization failed. Token not returned.')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.roles.Admin === ROLES.Admin) {
        next()
    } else {
        res.status(401)
        throw new Error('Admin authorization failed.')
    }
}

module.exports = { protect, admin }