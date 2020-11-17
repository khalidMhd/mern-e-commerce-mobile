const mongoose = require('mongoose')
const product = require('./product')
const Schema = mongoose.Schema
const orderSchema = new mongoose.Schema({
    address: {type:String, required:true},
    city: {type:String,required:true},
    postalCode:{type:String,required:true},
    country: {type:String,required:true},
    qty:[],
    createdAt:{type:Date, default:Date.now},
    status:{type:String, default:"Initiated"},
    user: {type:Schema.Types.ObjectId, ref:'user'},
    product: [{type:Schema.Types.ObjectId, ref:'product'}]
})

const order = mongoose.model('Order', orderSchema)
module.exports = order