const { Schema } = require('mongoose')

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    code: {
        type: Number,
        required: true,
    }
})

module.exports = roleSchema