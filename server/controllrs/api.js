const user = require('../models/user')
const userSchema = require('../models/user')

module.exports = class API{
    //Create user
    static async createUser( req,res){
        const user =userSchema(req.body)
        user.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    } 

    //Obtener todos
    static async getAllUsers( req,res){
        userSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getUser( req,res){
        const {id} =req.params;
        userSchema
        .findById(id)    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putUser( req,res){
        const {id} =req.params;
        const{nombre,edad} = req.body
        userSchema
        .updateOne({_id:id},{$set:{nombre,edad}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteUser( req,res){
        const {id} = req.params;
        userSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}