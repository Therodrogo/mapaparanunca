//ESQUEMAS DE MONGOSEE
const mongoose = require('mongoose')
const userSchema =mongoose.Schema({
    nombre:String,
    edad: Number
})

module.exports = mongoose.model("users",userSchema)