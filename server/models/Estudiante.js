//ESQUEMAS DE MONGOSEE
const { Int32 } = require('bson')
const mongoose = require('mongoose')
const EstudianteSchema =mongoose.Schema({
    nombre:String,
    dni:Number,
    contraseña:String,
    carrera:String

},{
    versionKey:false
})

module.exports = mongoose.model("estudiantes",EstudianteSchema)