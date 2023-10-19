const { connect, connection } = require('mongoose')

const connectStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookendsDB'

console.log(connect(connectStr))

module.exports = connection