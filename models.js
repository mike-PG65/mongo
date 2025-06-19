const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true
    },

    lastName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: false
    },
    age:{
        type: Number,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('contactlist', userSchema)

module.exports = User