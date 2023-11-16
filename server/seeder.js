require('dotenv').config()
const { connect } = require('mongoose')
const books = require('./data/books.js')
const users = require('./data/users.js')
const Book = require('./models/Book.js')
const Order = require('./models/Order.js')
const User = require('./models/User.js')

const connectStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookendsDB'

const connectDB = async () => {
    try {
        const conn = await connect(connectStr)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Could not connect to DB: ${err.message}`)
        process.exit(1)
    }
}

connectDB()

const importData = async () => {
    try {
        await Book.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()
        
        await Book.insertMany(books)
        await User.insertMany(users)

        console.log('Data Imported')
        process.exit()
    } catch (err) {
        console.log(`Failed to import data: ${err}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Book.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed')
    } catch (err) {
        console.log(`Failed to destroy data: ${err}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}