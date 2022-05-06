<template>
    <div class="contenedor">
        <div @click="cerrarSesion" class="cerrarSesion" v-if="mostrarLogin && estadoMensaje">
            <p>Cerrar Sesion</p>
        </div>
        <img  @click="mostrarIzquierda" class="logo" src="https://i.ibb.co/rGZ37tq/logomapablanco.png" alt=""  height="37">
        
        <button class="botoniniciar" small elevation="" @click="mostrar" >
            <img class="user" src="https://i.ibb.co/VLJ6CsC/user.png" alt="" width="40">
            
        </button>

        <div @click="mostrar"  class="textIniciar">{{nombreUsuario}}</div>
            <button @click="mostrarMiscursos" v-if="estadoBotonMisCursos" class="botonMisCursos"> 
                Mis Cursos 
                <ion-icon name="add-circle-outline"></ion-icon>
            </button>
            <div class="bloqueAdmin">
                <button v-if="estadoBotonAdmin" class="botonOpAdmin"> 
                    Gestionar Edificios
                    <ion-icon name="briefcase"></ion-icon>
                </button>
                <button v-if="estadoBotonAdmin" class="botonOpAdmin"> 
                    Editar Cursos
                    <ion-icon name="book"></ion-icon>
                </button>
            </div>
        
        <div v-if="mostrarLogin && estadoMensaje===false">
            <FormularioLogin
                @notifica="validar"
            />
        </div>

        <div v-if="estadoIzquierda">
            <MenuIzquierda/>
        </div>

        <div v-if="estadoMiscursos">
            <VistaEstudiante/>
        </div>
        

    </div>
    






     
</template>

<script>
import FormularioLogin from "./MenuArriba/FormularioLogin.vue";
import MenuIzquierda from './MenuIzquierda.vue';
import VistaEstudiante from "./MenuArriba/VistaEstudiante.vue";
import API from "@/api"
import swal from "sweetalert";
export default {
    components: {
    FormularioLogin,
    MenuIzquierda,
    VistaEstudiante
},
    data(){
        return{
            datosusuario: {
                nombreusuario: "Iniciar Sesion",
                contraseña: ""
            },
            estado: false,
            estadoIzquierda: false,
            estadoMiscursos: false,
            estadoValidar:null,
            estadoBotonMisCursos:false,
            estadoBotonAdmin:false,
            estadoMensaje:false,
            mostrarLogin:false,
            nombreUsuario:"Iniciar Sesion",


        }
    },
    props:{
        
        menuEstudiante: Boolean,
        menuAdministrador: Boolean,
    },
    methods:{
        mostrar(){

            if(this.mostrarLogin && this.estadoBotonMisCursos==false || this.mostrarLogin &&  this.estadoBotonAdmin==false){

                this.mostrarLogin = false;
            }
            else{
                this.mostrarLogin = true;
            }
            
        },
        mostrarIzquierda(){
            if(this.estadoIzquierda){

                this.estadoIzquierda = false;
            }
            else{
                this.estadoIzquierda = true;
            }
            
        },
        mostrarMiscursos(){
            if(this.estadoMiscursos){

                this.estadoMiscursos = false;
            }
            else{
                this.estadoMiscursos = true;
            }
            
        },
        async validar(e) {
            
            const res = await API.validarusuario(e);
            console.log(res)
            this.estadoMensaje = res.msg;
            
            if (this.estadoMensaje) {
                swal("Listo", "Validacion exitosa.", "success");
            }
            else {
                swal("Oops", "Datos invalidos.", "error");
            }

            if(res.tipoUsuario=='estudiante'){
                console.log('Soy estudiante');
                this.nombreUsuario = res.nombre
                this.estadoBotonMisCursos = true
                this.mostrarLogin=false
            }
            if(res.tipoUsuario=='Administrador'){
                this.nombreUsuario = res.nombre
                this.estadoBotonAdmin =true
                this.mostrarLogin=false
            }
        },
        cerrarSesion(){
            this.datosusuario.nombreUsuario = "Iniciar Sesion";
            this.datosusuario.contraseña= "";

            this.estado= false;
            this.estadoIzquierda= false;
            this.estadoMiscursos= false;
            this.estadoValidar=null;
            this.estadoBotonMisCursos=false;
            this.estadoBotonAdmin=false;
            this.estadoMensaje=false;
            this.mostrarLogin=false;
            this.nombreUsuario="Iniciar Sesion";

            swal("Sesion cerrada", "Cierre de sesion exitoso.", "success");
        }
    },
}
</script>

<style scoped>

.contenedor{
    display: inline-block;
    float: right;
    position: relative;
    top: 0;
    margin: 0;
    width: 100%;
    z-index: 31;
    background-color: #313C75;
    height: 50px;
    color: aliceblue ;
}

.logo{
    margin: 5px;
    position: relative;
    z-index: 7;
    cursor: pointer;
}
.botoniniciar{
    float: right;
    background: #313C75;
    position: relative;
    margin: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.5s;
    z-index: 6;
}

.botoniniciar:hover {

    background: #677EF5;
    transition: 0.5s;

}

.textIniciar{
    float: right;
    display: inline-block;
    position: relative;
    margin: 12px 0 0 0;
    width: auto;
    cursor: pointer;
    transition: 0.5s;
}
.botonMisCursos{
    float: right;
    width: auto;
    height: auto;
    margin: 12px 50px 0 0;
    
}
.botonMisCursos:hover ion-icon{
    background: #677EF5;
} 

.bloqueAdmin{
    display: flex;
    float: right;
    background: #313C75;
    position: relative;
}

.botonOpAdmin{
    float: right;
    width: auto;
    margin: 12px 50px 12px 10px;
}
.cerrarSesion{
    float: right;
    position: absolute;
    z-index: 34;
    cursor: pointer;
    top: 52px;
    right: 0;
    
}
.cerrarSesion p{
    
    background: white;
    padding: 5px;
    border-radius: 5%;
    border: 2px solid #313C75;
    color: #313C75;
}


ion-icon{
    position: absolute;
    margin: 0px 0 0 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    transition: 0.5s;
}
ion-icon:hover{
    background: #677EF5;
}

</style>