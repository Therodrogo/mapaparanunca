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
        const nombreEdificios = []
        try {
            const data = await EdificioSchema.find()  
            data.forEach(element => {
                nombreEdificios.push(element.nombre)
            });
            console.log(nombreEdificios)
            res.json(nombreEdificios)
        } catch (error) {
            res.json(error)
        }
        
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
        try {
            const nombre = req.params.nombre
            const data = await EdificioSchema.findOne({nombre:nombre}).populate("salasID") 
            const salas =[]
    
            data.salasID.forEach(element => {
                
                salas.push(element.nombre)
            }); 
            
        
            res.json(salas)
        } catch (error) {
            res.json(error)
        }
        
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