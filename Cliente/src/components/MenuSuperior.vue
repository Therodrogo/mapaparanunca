<template>
    <div class="superior">
        <div class="menuIzquierda">
            <v-img
                lazy-src=""
                max-height="55"
                max-width="55"
                src="https://i.ibb.co/rGZ37tq/logomapablanco.png"
                class="logo"
                @click="mostrarIzquierda" 
            >
            </v-img>
            <div class="izquierda" v-if="estadoIzquierda" >
            <MenuIzquierda/>
            </div>

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
import MenuIzquierda from "./MenuIzquierda.vue";
export default {
    components: {
    FormularioLogin,
    MenuIzquierda
},
    data(){
        return{
            estado: false,
            estadoIzquierda: false

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
            
        },
        mostrarIzquierda(){

            if(this.estadoIzquierda){

                this.estadoIzquierda = false;
            }
            else{
                this.estadoIzquierda = true;
            }
            
        }
    }
}
</script>

<style scoped>

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
    
    width: 100px;
    top: 15%;
    right: 100%;
    position: absolute;
    transition: 0.5s;
}

.superior{
    
    position: relative;
    z-index: 10;
    background-color: #313C75;
    text-align: center;
    height: 50px;
    width: 100%;
    color: aliceblue ;
    
}

.botoniniciar{
    
    float: right;
    display: flex;
    justify-content: right;
    position: relative;
    bottom: 85%;
    right: 6%;
    
    background: #313C75;
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

.botoniniciar:hover .textIniciar{
    transition: 0.5s;
    display: block;
}

#iconSesionSuperios{
    width: 30px;
    height: 30px;


}

.menuIzquierda{
    
}

.logo{
    padding: 10px 0 0 0;
    left: 0.6%;
    position: relative;
    z-index: 7;
    cursor: pointer;
}

</style>