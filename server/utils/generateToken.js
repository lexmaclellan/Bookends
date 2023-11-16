const jwt = require('jsonwebtoken')

const generateAccessToken = (res, _id, roles) => {
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

const generateRefreshToken = (res, _id) => {
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

module.exports = { generateAccessToken, generateRefreshToken }