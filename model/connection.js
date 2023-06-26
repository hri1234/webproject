const mongoose= require('mongoose')
var url="mongodb://127.0.0.1:27017/hritik"
mongoose.connect(url)
var db= mongoose.connection
console.log('sucssefully conected with your database')

module.exports=db;
