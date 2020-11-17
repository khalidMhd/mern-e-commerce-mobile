const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const loginRequire = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const user = require('../models/user')

const JWT_SECRET = "qwertyuiop"

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "khalidmehmood1880@gmail.com",
        pass: '@Khush1137'
    }
});

router.get('/user',(req,res)=>{
    user.find({}).then(data=>{
        if(data){
            res.send(data)
        }
    })
})

router.post('/createAdmin', (req, res) => {
    const { name = 'admin', email = 'admin@gmail.com', password} = req.body

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" })
    } else {
        userModel.findOne({ email: email }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already Exist with that email" })
            } else {
                bcrypt.hash(password, 12).then(password => {
                    const userDetails = new userModel({
                        name: name,
                        email: email,
                        password: password,
                        isAdmin: true
                    })

                    userDetails.save()
                        .then(user => {
                            console.log(user);
                            res.status(200).json(user)
                        })
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" })
    } else {
        userModel.findOne({ email: email }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already Exist with that email" })
            } else {
                bcrypt.hash(password, 12).then(password => {
                    const userDetails = new userModel({
                        name: name,
                        email: email,
                        password: password,
                    })

                    userDetails.save()
                        .then(user => {
                            console.log(user);
                            const token = jwt.sign({ _id: user._id }, JWT_SECRET)
                            const { _id, name, email } = user
                            res.status(200).json({token,user: {_id, name, email } })
                        })
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    userModel.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: "successfully signed in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.post('/adminSignin', (req, res) => {
    const { email, password, isAdmin = true } = req.body

    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }

    userModel.findOne({ email: email, isAdmin: isAdmin })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: "successfully signed in" + savedUser })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log("errrrrrr" + err)
        }
        const token = buffer.toString("hex")
        userModel.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User dont exists with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        // from:"no-replay@insta.com",
                        subject: "password reset",
                        html: `
                     <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                    })
                    res.json({ message: "check your email" })
                })

            }).catch(error=>{
                console.log(error);
            })
    })
})

router.post('/new-password', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    userModel.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = router