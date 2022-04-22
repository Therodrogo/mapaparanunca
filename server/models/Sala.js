//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const SalaSchema =mongoose.Schema({
    nombre:String,
    id_edificio: ObjectId

},{
    versionKey:false
})

module.exports = mongoose.model("salas",SalaSchema)