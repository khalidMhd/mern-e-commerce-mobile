const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Ecommerce',
// {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});

mongoose.connect('mongodb://khalid:khalid21@e-mobile-shard-00-00.3ckfm.mongodb.net:27017,e-mobile-shard-00-01.3ckfm.mongodb.net:27017,e-mobile-shard-00-02.3ckfm.mongodb.net:27017/e-mobile?ssl=true&replicaSet=atlas-3uz0q9-shard-0&authSource=admin&retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("Database Connected")
});
module.exports = db