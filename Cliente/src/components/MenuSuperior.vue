<template>
    <div class="contenedor">
        
        <img  @click="mostrarIzquierda" class="logo" src="https://i.ibb.co/rGZ37tq/logomapablanco.png" alt=""  height="37">
        
        <button class="botoniniciar" small elevation="" @click="mostrar" >
            <img class="user" src="https://i.ibb.co/VLJ6CsC/user.png" alt="" width="40">
        </button>
        <div  class="textIniciar">{{nombreUsuario}}</div>

            <button @click="mostrarMiscursos" v-if="menuEstudiante" class="botonMisCursos"> 
                Mis Cursos 
                <ion-icon name="add-circle-outline"></ion-icon>
            </button>
            

        <div v-if="estado">
            <FormularioLogin/>
        </div>

        <div v-if="estadoIzquierda">
            <MenuIzquierda/>
        </div>

        <div v-if="menuEstudiante && estadoMiscursos">
            
            <VistaEstudiante/>
        <emit-event @getEstado="obtenerEstado"></emit-event>
            
        </div>  
    </div>
    
   
          
     
</template>

<script>
import FormularioLogin from "./MenuArriba/FormularioLogin.vue";
import MenuIzquierda from './MenuIzquierda.vue';
import VistaEstudiante from "./MenuArriba/VistaEstudiante.vue";

export default {
    components: {
    FormularioLogin,
    MenuIzquierda,
    VistaEstudiante
},
    data(){
        return{
            estado: false,
            estadoIzquierda: false,
            estadoMiscursos: false,
            estadoValidar:null,
            

        }
    },
    props:{
        nombreUsuario:String,
        menuEstudiante: Boolean,
        menuAdministrador: Boolean,
        

    },
    methods:{
        mostrar(){

            if(this.estado){

                this.estado = false;
            }
            else{
                this.estado = true;
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
    },
}
</script>

<style scoped>

.contenedor{
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