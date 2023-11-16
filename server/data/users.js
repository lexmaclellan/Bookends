const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Lex MacLellan',
        email: 'lex@email.com',
        password: bcrypt.hashSync('supersecret', 10),
        roles: {
            User: 3509,
            Admin: 6401
        }
    }
]

module.exports = users