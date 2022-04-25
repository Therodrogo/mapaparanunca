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
        
        <button class="botoniniciar" small elevation="" @click="mostrar" >
            
            <ion-icon id="iconSesionSuperios" name="contact"></ion-icon>
            
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
    left: 97%;
    
    background: #B1BDF7;
    width: 40px;
    height: 40px;

    top: 5px;
    border-radius: 50%;
    transition: 0.5s;
    z-index: 6;
}

.botoniniciar:active{

    background: cadetblue;
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