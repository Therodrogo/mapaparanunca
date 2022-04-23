const EdificioSchema = require('../models/Edificio')


module.exports = class API{
    //Crear
    static async createEdificio( req,res){
        const edificio = EdificioSchema(req.body)
        edificio.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Obtener todos con datos.
    static async getAllEdificios( req,res){
        EdificioSchema
        .find().populate("salasID")      
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    static async getEdificio( req,res){
        
        const id = req.params.id
        EdificioSchema
        .find({_id:id})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener edificio mediante ID de sala 
    static async getEdificioBySalaID( req,res){
        
        const id = req.params.id
        EdificioSchema
        .findOne({_id:id}).populate("salasID") 
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar  mediante ID
    static async putEdificio( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        EdificioSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar  mediante ID
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