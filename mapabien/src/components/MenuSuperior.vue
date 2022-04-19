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
        
       

        <button class="botoniniciar" small elevation="" color="">
            <ion-icon id="iconSesionSuperios" name="contact"></ion-icon>
        </button>
        
        
        
    </div>
         
     
</template>

<script>
export default {

}
</script>

<style>

.superior{
    position: relative;
    z-index: 4;
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
    transition: 0.1s;
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