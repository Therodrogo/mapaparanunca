<template>

  <div id="contenedor">
   
    <MenuSuperior/>
    <MenuIzquierda 

      nombre="Yo"
    />
    <MapaMapBox/>
    
    

  </div>

</template>

<script>

import MenuIzquierda from "./components/MenuIzquierda.vue";
import MapaMapBox from "./components/MapaMapBox.vue";
import MenuSuperior from "./components/MenuSuperior.vue";
//import InformacionEdifcio from "./components/InformacionEdifcio.vue";


export default {
  name: "App",
  components: {
    MenuIzquierda,
    MapaMapBox,
    MenuSuperior,
    //InformacionEdifcio
},
};

</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;

    color: #2c3e50;
    
    
  }

  

</style>
