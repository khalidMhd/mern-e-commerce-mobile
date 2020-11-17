const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const categoryModel = require('../models/category')
const product = require('../models/product')
const productModel = require('../models/product')
const user = require('../models/user')


router.get("/product", async (req, res) => {
    const products = await productModel.find({}).sort('-created_At');
    res.send(products)
})


router.post('/product',loginRequire, (req, res, next) => {
    const { name, categoryName, price,countInStock, url, details } = req.body;
    if (!name || !categoryName || !price || !details) {
        return res.status(422).json({ error: "Please fill all the fields" })
    } else {
        const productDetails = new productModel({
            name: name.toLowerCase(),
            categoryName: categoryName,
            price: price,
            countInStock:countInStock,
            image: url,
            details: details,
        })
        productDetails.save()
            .then(result => {
                res.status(200).json(result)
            }).catch(err => {
                console.log(err);
            })
    }
})

router.delete('/product/:id',loginRequire, (req, res) => {
    productModel.findByIdAndDelete({ _id: req.params.id }).then(data => {
        if (data) {
            res.json(data)
        }
        else {
            res.json('data not found')
        }
    })
})

router.put('/product/:id',loginRequire, async (req, res) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (product) {
        product.name = req.body.name.toLowerCase();
        product.categoryName = req.body.categoryName;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock
        product.details = req.body.details;

        const updatedProduct = product.save();
        if (updatedProduct) {
            return res
                .status(200)
                .send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.get('/product/:id', (req, res) => {
    productModel.findById({ _id: req.params.id }).then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'Product Not Found.' });
        }
    })
});

router.get('/category/:product', (req, res) => {
    productModel.find({ categoryName: req.params.product }).then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'Product Not Found.' });
        }
    })
});

router.post('/search-product',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    productModel.find({name:{$regex:userPattern}})
    .then(product=>{
        res.json({product})
    }).catch(error=>{
        console.log(error);
    })
})

module.exports = router