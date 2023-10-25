const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
const AuthRoute = require('./Routes/Auth.route')


const app = express()
app.use(morgan('dev'))

app.get('/', async(req, res, next) =>{
    res.send("Hello from Express. ")
})



app.use('/auth', AuthRoute )




app.use(async(req, res, next) =>{
    // const error = new Error("Not found")
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})



app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.send({
        error:{
            status:error.status || 500,
            message:error.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
     console.log(`Server running on port ${PORT}`)
})