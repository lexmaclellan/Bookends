require('dotenv').config({ path: '../.env'} )
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const { logger, logEvents } = require('./middleware/logEvents')
const corsOptions = require('./config/corsOptions')
const db = require('./config/connection')
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(logger)
app.use(cors(corsOptions))
app.unsubscribe(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
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