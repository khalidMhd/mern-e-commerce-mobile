const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {type:String,required:true,trim: true},
    details: {type:String,required:true},
    image: {type:String, default:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg&usqp=CAU', required:true},
    created_At:{type:Date, default:Date.now}
})

const category = mongoose.model('category', categorySchema)
module.exports = category