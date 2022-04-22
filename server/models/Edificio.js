//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const EdificioSchema =mongoose.Schema({
    nombre:String,

},{
    versionKey:false
})

module.exports = mongoose.model("edificios",EdificioSchema)