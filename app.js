const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = require('./config/keys');
const product = require('./models/product');
const PORT =process.env.PORT || 5000

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/profile'))
app.use(require('./routes/category'))
app.use(require('./routes/product'))
app.use(require('./routes/order'))

if(process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}


app.listen(PORT,()=>{
    console.log('Port is running on PORT: ' , PORT)
})