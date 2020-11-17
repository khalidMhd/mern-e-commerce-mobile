const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    categoryName: {type:String,required:true,trim: true},
    price: {type:Number,required:true},
    details: {type:String,required:true},
    image: {type:String, default:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSdT-CMjPc50R-jKEvJl_rcn3mBMvkcUwERg&usqp=CAU', required:true},
    created_At:{type:Date, default:Date.now},
    countInStock:{type:Number,required:true,default:1},
})

const product = mongoose.model('product', productSchema)
module.exports = product