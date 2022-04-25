<template>
    <div class="superior">
        <v-img
            lazy-src=""
            max-height="55"
            max-width="55"
            src="https://i.ibb.co/rGZ37tq/logomapablanco.png"
            class="logo"
        >
        </v-img>
        <div class="panelIniciar">
            
        </div>
        <button class="botoniniciar" small elevation="" @click="mostrar" >
            <v-img
            lazy-src=""
            max-height="40"
            max-width="40'"
            src="https://i.ibb.co/VLJ6CsC/user.png"
            class="user"
            >
            </v-img>
            
            <div  class="textIniciar">Iniciar Sesion</div>
        </button>
       
    </div>

    <div class="login" v-if="estado">
        <FormularioLogin/>
    </div>
         
     
</template>

<script>
import FormularioLogin from "./MenuArriba/FormularioLogin.vue";
export default {
    components: { 
        FormularioLogin 
    },
    data(){
        return{
            estado: false
        }
    },
    methods:{
        mostrar(){

            if(this.estado){

                this.estado = false;
            }
            else{
                this.estado = true;
            }
            
        }
    }
}
</script>

<style>

button .login{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background: #313C75;
    z-index: 3000;
    transition: 0.5s;
}

.panelIniciar{
    position: relative;
    bottom: 75%;
    left: 87.5%;
    
}

.textIniciar{
    
    top: 15%;
    width: 100px;
    right: 120%;
    position: absolute;
    transition: 0.5s;
}

.superior{
    position: relative;
    z-index: 10;
    background-color: #313C75;
    text-align: center;
    height: 50px;
    color: aliceblue ;
    
}

.botoniniciar{
    
    position: absolute;
    left: 95%;
    
    background: #313C75;
    width: 40px;
    height: 40px;

    top: 5px;
    border-radius: 50%;
    transition: 0.5s;
    z-index: 6;
}

.botoniniciar:hover {

    background: #677EF5;
    transition: 0.5s;

}

.botoniniciar:hover .textIniciar{
    transition: 0.5s;
    display: block;
}

#iconSesionSuperios{
    position: absolute;
    width: 30px;
    height: 30px;

    bottom: 15%;
    right: 14%;

}

.logo{
    top: 15%;
    left: 0.6%;
    position: relative;
    z-index: 7;
}

</style>