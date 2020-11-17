const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const userModel = require('../models/user')
const orderModel = require('../models/order')   

router.get('/profile/:id',loginRequire,(req,res,next)=>{
    orderModel.find({user:req.params.id}).sort('-createdAt').populate('user product').then(data=>{
        if(data){
            res.status(200).json(data)
        } else{
            res.status(422).json({error:"Data Not Found"})
        }
    })
})

module.exports = router