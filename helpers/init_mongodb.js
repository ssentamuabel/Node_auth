const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
    dbName:process.env.DB_NAME,
    useNewUrlParser: true
})
.then(()=>{
    console.log("Mongo Db connected ")
})

.catch(err =>console.log(err.message))


mongoose.connection.on('connected', ()=>{
    console.log("Mongoose connected to Database")
})

mongoose.connection.on('error', (err)=>{
    console.log(err.message)
})


mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected')
})



process.on('SIGINT', async()=>{
    await mongoose.connection.close()
    process.exit(0)
})