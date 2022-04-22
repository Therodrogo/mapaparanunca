const SalaSchema = require('../models/Sala')


module.exports = class API{
    //Create 
    static async createSala( req,res){
        const sala = SalaSchema(req.body)
        sala.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Obtener todos
    static async getAllSalas( req,res){
        SalaSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getSala( req,res){
        
        const id_sala = req.params.id
        SalaSchema
        .find({_id:id_sala})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putSala( req,res){
        const {id} =req.params;
        const{nombre,edad} = req.body
        SalaSchema
        .updateOne({_id:id},{$set:{nombre,edad}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteSala( req,res){
        const {id} = req.params;
        SalaSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}