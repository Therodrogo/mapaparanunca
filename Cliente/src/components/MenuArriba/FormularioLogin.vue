<template> 

    <div class="container">
        <div class="formBx">
            <div class="form singinForm">
                <form >
                    <h3>Iniciar sesion</h3>
                    <input type="usuario" placeholder="Usuario" v-model="datosusuario.nombreusuario">
                    <input type="password" placeholder="Contraseña" v-model="datosusuario.contraseña">
                    <h4>¿Olvidate tu contraseña?</h4>
                    <br>
                    <button class="iniciar" @click="validar"> Validar</button>
                </form>
            </div>
            
        </div>
    </div>
  
</template>

<script>
import API from "@/api"
import swal from 'sweetalert';
export default {

    data(){

        return {
            datosusuario:{
                nombreusuario: null,
                contraseña:""
            },
            estadoMensaje:null
            
        }
    },
    props:{
        estado:Boolean,
    },
    methods:{
        
        async validar(){
        
        const res = await API.validarusuario(this.datosusuario)
        this.estadoMensaje = res;
        if(this.estadoMensaje){
            swal ( "Listo" ,  "Validacion exitosa." ,  "success" );

        }
        else{
            swal ( "Oops" ,  "Datos invalidos." ,  "error" )
        }
        
    }
       
    },

}


</script>

<style scoped>

.container{
    float: right;
    display: flex;
    justify-content: right;
    max-width: 50vh;
    width: 50vh;
    height: 350px;
    right: 90%;

    z-index: 50;
    transition: 0.5s;
}

.formBx{
 
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    right: 3%;
    z-index: 32;
    transition: 0.5s;

    border-radius: 3%;
    border-color: #313C75;
    border: 10px;
    
}

.formBx .form{

    padding: 50px;
    transition: 0.5s;
}

.formBx .form form{
    float: center;
    display: flex;
    flex-direction: column;
}

.formBx .form form h3{
    font-size: 1.5em;
    color: #313C75;
    margin-bottom: 20px;
    font-weight: 500;
}

.formBx .form form input{
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    font-size:16px;
    border: 1px solid #313C75;
    color:#313C75;
    
}
.iniciar{

    background: #313C75;
    border: none;
    max-height: 100px;
    cursor: pointer;
    max-width: 50%;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    font-size:16px;
    color:rgb(255, 255, 255);

}

.formBx .form form input::placeholder{
    color: #485077;
}

h4{
    color: rgb(0, 132, 255);
    font-size: 14px;
    cursor: pointer;
}

</style>