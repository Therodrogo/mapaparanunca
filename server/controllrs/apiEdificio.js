const EdificioSchema = require('../models/Edificio')


module.exports = class API{
    //Create 
    static async createEdificio( req,res){
        const edificio = EdificioSchema(req.body)
        edificio.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Obtener todos
    static async getAllEdificios( req,res){
        EdificioSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getEdificio( req,res){
        
        const id = req.params.id
        EdificioSchema
        .find({_id:id})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putEdificio( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        EdificioSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteEdificio( req,res){
        const {id} = req.params;
        EdificioSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}