const AsisteSchema = require('../models/Asiste')


module.exports = class API{
    //Create 
    static async createAsiste( req,res){
        const Asiste = AsisteSchema(req.body)
        Asiste.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
        
    }

    //Obtener todos
    static async getAllAsistes( req,res){
        AsisteSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getAsiste( req,res){
        
        const id = req.params.id
        AsisteSchema
        .find({_id:id})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putAsiste( req,res){
        const {id} =req.params;
        const{nombre} = req.body
        AsisteSchema
        .updateOne({_id:id},{$set:{nombre}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteAsiste( req,res){
        const {id} = req.params;
        AsisteSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}