const EstudianteSchema = require('../models/Estudiante')
const bcrypt = require('Bcrypt')

module.exports = class API{
    //Create 
    static async createEstudiante( req,res){
        const {body} =req
        const {nombre,dni,contraseña,carrera} = body
        const contra = await bcrypt.hash(contraseña,3)
        
        const estudiante = new EstudianteSchema({
           nombre,
            dni,
            contraseña:contra,
            carrera,
        })
        const usuarioGuardado = await estudiante.save()
        res.json(usuarioGuardado)
    } 
    static async validarUsuario(req,res){
        const userdni = req.body.nombreusuario
        const contra = req.body.contraseña

        const datos = await EstudianteSchema.find({dni:userdni})
        if(datos.length>0){
            const match = await bcrypt.compare(contra,datos[0].contraseña)
            if(match){
                res.json({"msg":"ACCESO VALIDO"})   
            }else{
                res.json({"msg":"CONTRASEÑA INVALIDA"})
            }
               
        }else{
            res.json({"msg":"NO SE ENCONTRO EL USUARIO"})
        }
    }


    //Obtener todos
    static async getAllEstudiantes( req,res){
        EstudianteSchema
        .find()    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Obtener usuario
    static async getEstudiante( req,res){
        
        const userdni = req.params.dni
        EstudianteSchema
        .find({dni:userdni})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Actualizar usario mediante ID
    static async putEstudiante( req,res){
        const {id} =req.params;
        const{nombre,edad} = req.body
        EstudianteSchema
        .updateOne({_id:id},{$set:{nombre,edad}})    
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
    }
    //Eliminar usario mediante ID
    static async deleteEstudiante( req,res){
        const {id} = req.params;
        EstudianteSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({
            message:error
        }))
    }

}