const CursoSchema = require('../models/Curso')


module.exports = class API{
    //Create 
    static async createCurso( req,res){
        const Curso = CursoSchema(req.body)
        Curso.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Obtener todos
    static async getAllCursos( req,res){
        CursoSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getCurso( req,res){
        
        const id = req.params.id
        CursoSchema
        .find({_id:id})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putCurso( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        CursoSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteCurso( req,res){
        const {id} = req.params;
        CursoSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}