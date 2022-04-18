<template>

  <div id="contenedor">
    
    <MenuParaPagina/>
    

  </div>

</template>

<script>

import MenuParaPagina from "./components/MenuParaPagina.vue";


export default {
  name: "App",
  components: {
    MenuParaPagina,
},
};

</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;

    color: #2c3e50;

    
  }

  

</style>
