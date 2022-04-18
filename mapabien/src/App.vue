<template>

  <div id="contenedor">

    <MenuSuperior/>
    <MenuIzquierda/>
    <MapaMapBox/>
    
    

  </div>

</template>

<script>

import MenuIzquierda from "./components/MenuIzquierda.vue";
import MapaMapBox from "./components/MapaMapBox.vue";
import MenuSuperior from "./components/MenuSuperior.vue";


export default {
  name: "App",
  components: {
    MenuIzquierda,
    MapaMapBox,
    MenuSuperior
},
};

</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;

    color: #2c3e50;
    
    
  }

  

</style>
