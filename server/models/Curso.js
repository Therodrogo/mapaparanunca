//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const CursoSchema =mongoose.Schema({
    nombre:String

},{
    versionKey:false
})

module.exports = mongoose.model("cursos",CursoSchema)