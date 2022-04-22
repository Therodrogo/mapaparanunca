//ESQUEMAS DE MONGOSEE
const { Int32, ObjectId } = require('bson')
const mongoose = require('mongoose')
const AsisteSchema =mongoose.Schema({
    id_estudiante: ObjectId,
    id_sala: ObjectId,
    id_curso: ObjectId,
    seccion: String,
    hora_inicio: String,
    hora_final: String,
    dia: String

},{
    versionKey:false
})

module.exports = mongoose.model("asistes",AsisteSchema)