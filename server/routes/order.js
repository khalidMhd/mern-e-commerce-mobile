const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const userModel = require('../models/user')
const productModel = require('../models/product')
const { json } = require('express')
const { route } = require('./auth')
const product = productModel.find({})
const orderModel=require('../models/order')

router.get('/placeOrdersSecreen',loginRequire,(req,res,next)=>{
    orderModel.find({}).sort('-createdAt').populate('user product').then(data=>{
        if(data){
            res.status(200).json(data)
        } else{
            res.status(422).json({error:"Data Not Found"})
        }
    })
})

router.post('/placeOrder',loginRequire, (req,res)=>{
    const orderDetails = new orderModel({
        address:req.body.address,
        city:req.body.city,
        postalCode:req.body.postalCode,
        country:req.body.country,
        user:req.body.user,
        product:req.body.product,
        qty:req.body.qty
    })
    orderDetails.save().then(data=>{
        console.log(data);
        res.send(data)
    }).catch(error=>{
        console.log(error);
    })
})

router.delete('/order-delete/:id',loginRequire, (req,res)=>{
  orderModel.findByIdAndDelete({_id:req.params.id}).then(data=>{
      if(data) {
          res.json(data)
      }
      else {
          res.json('data not found')
      }
  })
})

router.put('/update-status/:id',loginRequire, async (req, res) => {
    console.log('update product');
    const orderId = req.params.id;
    const product = await orderModel.findById(orderId);
    if (product) {
      product.status = req.body.status;

      const updatedOrder =  product.save();
      if (updatedOrder) {
        return res.status(200).send({ message: 'Product Updated', data: updatedOrder });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

module.exports = router