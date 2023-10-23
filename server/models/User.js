const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
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
    },
    {
        timestamps: true,
    }
)

userSchema.statics.register = async function(name, email, password) {
    if (!name || !email || !password) {
        throw new Error('Send all required fields: name, email, password')
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid.')
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters.')
    }

    const exists = await this.findOne({email})
    if (exists) {
        throw new Error('A user with that email address is already registered.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })
    
    return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw new Error('Invalid email or password.')
    }

    const user = await this.findOne({email})
    if (!user) {
        throw new Error('Invalid email or password.')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Invalid email or password.')
    }

    return user
}

const User = model('User', userSchema)

module.exports = User