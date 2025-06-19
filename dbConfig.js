const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected successfully")
    }catch(error){
        console.log("Error connecting to the database!!",error)
    }
}

module.exports = connectDb