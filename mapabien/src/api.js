import axios from 'axios'
const url = "/api/Estudiante"


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

    
}