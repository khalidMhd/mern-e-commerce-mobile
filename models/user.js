const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique: true,},
    password: {type:String,required:true},
    isAdmin: { type: Boolean, required: true, default: false },
    resetToken:String,
    expireToken:Date,

})

const user = mongoose.model('user', userSchema)
module.exports = user