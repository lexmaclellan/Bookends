require('dotenv').config({ path: '../.env'} )
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const { logger } = require('./middleware/logEvents')
const credentials = require('./middleware/credentials')
const db = require('./config/connection')
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(routes)
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
    return res.status(234).send('Welcome to the Bookends API')
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server listening on port ${PORT}`)
    })
})