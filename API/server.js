require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({
    origin: '*'
}));
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/userRoutes')
app.use('/users', usersRouter)

app.listen(3000, () => console.log('Server Started'))