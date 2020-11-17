const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const categoryModel = require('../models/category')
const category = require('../models/category')


router.get("/category", async(req,res)=>{
    const categories = await categoryModel.find({}).sort('-created_At');
    res.json(categories)
})

router.post('/category',loginRequire,(req,res,next)=>{
   const {name, details,url } = req.body;
   if(!name || !details) {
        return res.status(422).json({ error: "Please fill all the fields" })
    } else {
        const categoryDetails = new categoryModel({
            name:name,
            image:url,
            details:details,
        })
        categoryDetails.save()
        .then(result => {
            res.status(200).json(result)
            console.log("Result "+result);
        }).catch(err => {
            console.log(err);
        })
    }
})

router.delete('/category/:id',loginRequire, (req, res) => {
    categoryModel.findByIdAndDelete({ _id: req.params.id }).then(data => {
        if (data) {
            res.json(data)
        }
        else {
            res.json('data not found')
        }
    })
})

router.put('/category/:id',loginRequire, async (req, res) => {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if (category) {
        category.name = req.body.name;
        category.details = req.body.details;

        const updatedCategory = category.save();
        if (updatedCategory) {
            return res
                .status(200)
                .send({ message: 'Category Updated', data: updatedCategory });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.get('/categoryList/:name', (req, res) => {
    categoryModel.find({ name: req.params.name }).then(data => {
        if (data) {
            res.status(200).send(data);
            console.log(data);
        } else {
            res.status(404).send({ message: 'Category Not Found.' });
        }
    })
});

module.exports = router