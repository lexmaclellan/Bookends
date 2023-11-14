const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Lex MacLellan',
        email: 'lex@email.com',
        password: bcrypt.hashSync('supersecret420', 10),
        roles: {
            User: 3509,
            Admin: 6401
        }
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('swordfish', 10),
        roles: {
            User: 3509
        }
    },
    {
        name: 'Joe Schmoe',
        email: 'joe@email.com',
        password: bcrypt.hashSync('12345678', 10),
        roles: {
            User: 3509,
            Banned: 4444
        }
    }
]

module.exports = users