import axios from 'axios'
const url = "/api/Estudiante"
var salas =[]

export default class API{
    //pedir usuario
    static async getEstudianteDNI(dni){
        const res = await axios.get(url+'/'+dni)

        return res.data

    }
    static async validarusuario(datos){
        const res = await axios.post(url+'/login',datos)
        return res.data.msg
    }
    static async getSalasByName(nombre){
        const res = await axios.get("/api/Edificio-sala/"+nombre)
        salas = res.data
        return res.data
    }
    static async getEdificios(){
        const res = await axios.get("/api/Edificio/")
      
        return res.data
    }
    static getSalas(){
        return salas
    }
}   