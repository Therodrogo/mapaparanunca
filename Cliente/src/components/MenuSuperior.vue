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
            <div @click="mostrar2" class="bloqueAdmin">
                <button @click="mostrarEdificios"  v-if="estadoBotonAdmin" class="botonOpAdmin"> 
                    Gestionar Edificios
                    <ion-icon name="briefcase"></ion-icon>
                </button>
                <button @click="mostrarEditarCursos"  v-if="estadoBotonAdmin" class="botonOpAdmin"> 
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
            <MenuIzquierda
                :nombre="posicionMono"           
            />
        </div>

        <div v-if="estadoMiscursos">
            <VistaEstudiante
            :idUsuario="idUsuario"
            @generarRutaMisCursos="rutasMisCursos"
            />
        </div>
        <div v-if="estadoEditarCursos">
            <GestionarCursos/>
        </div>
        <div v-if="estadoMisEdificios">
            <VistaAdmin/>
        </div>

        
    </div>
    
    <div>
        <MapaMapBox
        :nombreEdificioCurso = "nombreEdificioMisCursos"
        />
    </div>
    


     
</template>

<script>
import FormularioLogin from "./MenuArriba/FormularioLogin.vue";
import MenuIzquierda from './MenuIzquierda.vue';
import VistaEstudiante from "./MenuArriba/VistaEstudiante.vue";
import GestionarCursos from "./MenuArriba/GestionarCursos.vue";
import API from "@/api"
import swal from "sweetalert";
import VistaAdmin from "./MenuArriba/VistaAdmin.vue";
import MapaMapBox from "./MapaMapBox.vue";
export default {
    components: {
    FormularioLogin,
    MenuIzquierda,
    VistaEstudiante,
    GestionarCursos,
    VistaAdmin,
    MapaMapBox
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
            estadoMisEdificios:false,
            estadoValidar:null,
            estadoBotonMisCursos:false,
            estadoBotonAdmin:false,
            estadoMensaje:false,
            mostrarLogin:false,
            nombreUsuario:"Iniciar Sesion",
            estadoEditarCursos:false,
            idUsuario:"",
            nombreEdificioMisCursos:""


        }
    },
    props:{
        
        menuEstudiante: Boolean,
        menuAdministrador: Boolean,
        posicionMono: String,
        
    },
    methods:{
        mostrar(){

            if(this.mostrarLogin && this.estadoBotonMisCursos==false || this.mostrarLogin &&  this.estadoBotonAdmin==false || this.mostrarLogin==false && this.estadoEditarCursos ){
            console.log("SE CERRO ESTE MENU SE SUPONE PARA ACOMDODAR EL EDITAR CURSOS")    
                this.mostrarLogin = false;
            }
            else{
                
                this.mostrarLogin = true;
            }
            
        },

        mostrar2(){

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
                console.log("FUNCAAAAA3");
                this.estadoMiscursos = false;
            }
            else{
                console.log("FUNCAAAAA4");
                this.estadoMiscursos = true;
            }
            
        },
        mostrarEditarCursos(){
            if(this.estadoEditarCursos){
                    console.log("FUNCAAAAA2");
                this.estadoEditarCursos = false;
            }
            else{
                console.log("FUNCAAAAA");
                
                this.estadoEditarCursos = true;
            }
            
        },
            mostrarEdificios(){
            if(this.estadoMisEdificios){
                this.estadoMisEdificios = false;

            }
            else{
                this.estadoMisEdificios = true;
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
                this.idUsuario=res.idUsuario
            }
            if(res.tipoUsuario=='Administrador'){
                this.nombreUsuario = res.nombre
                this.estadoBotonAdmin =true
                this.mostrarLogin=false
                this.estadoIzquierda= true
                
                
            }
        },
        cerrarSesion(){
            this.datosusuario.nombreUsuario = "Iniciar Sesion";
            this.datosusuario.contraseña= "";

            this.estado= false;
            this.estadoIzquierda= false;
            this.estadoMiscursos= false;
            this.estadoMisEdificios=false;
            this.estadoValidar=null;
            this.estadoBotonMisCursos=false;
            this.estadoBotonAdmin=false;
            this.estadoMensaje=false;
            this.mostrarLogin=false;
            this.nombreUsuario="Iniciar Sesion";

            swal("Sesion cerrada", "Cierre de sesion exitoso.", "success");
        },
        rutasMisCursos(nombreEdificioMisCursos){
            swal(nombreEdificioMisCursos)

            this.nombreEdificioMisCursos = nombreEdificioMisCursos;
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

/*BLOQUE LITERAL DE LOS BOTONES */
.bloqueAdmin{
    display: flex;
    float: right;
    background: #da7416;
    /* background: #313C75; */
    position: relative;
}
/*BOTONES EN LA BARRA DEL ADMIN*/
.botonOpAdmin{
    float: right;
    width: auto;
    margin: 12px 50px 12px 10px;
}
.cerrarSesion{
    float: right;
    position: absolute;
    z-index: 6000;
    cursor: pointer;
    top: 52px;
    right: 0;
    
}
.cerrarSesion p{
    
    background: rgba(255, 255, 255, 0.666);
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