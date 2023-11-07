const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            User: {
                type: Number,
                default: 3509
            },
            Editor: Number,
            Admin: Number,
            Banned: Number
        },
        refreshToken: {
            type: String
        }
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
    }
)

userSchema.statics.register = async function(email, password) {
    if (!email || !password) {
        throw new Error('Send all required fields: email, password')
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid.')
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters.')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw new Error('A user with that email address is already registered.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = { email, password: hash }
    const user = await this.create(newUser)
    
    return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw new Error('Invalid email or password.')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw new Error('Invalid email or password.')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Invalid email or password.')
    } else {
        const roles = Object.values(user.roles).filter(Boolean)

        if (roles.Banned === 4444) {
            throw new Error('User has been banned.')
        }
    }

    return user
}

const User = model('User', userSchema)

module.exports = User