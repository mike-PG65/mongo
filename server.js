const express = require("express")
require('dotenv').config()

const User = require("./models")
const users = require('./users')

const app = express()

app.use(express.json())
const PORT = process.env.PORT

const connectDb = require('./dbConfig')


const userRoutes = require('./userRoutes')

app.use('/users', userRoutes)

const runServer = async ()=>{
    await connectDb();

//    await User.insertMany(users)

    app.listen(PORT, ()=>{
    console.log(`App is listening to http://localhost:${PORT}`)
})
}


runServer()


