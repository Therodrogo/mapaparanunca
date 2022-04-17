<template>

  <div id="contenedor">
    <MenuIzquierda/>
    <MapaGoogle/>

  </div>
  

 


</template>

<script>
import MapaGoogle from "./components/MapaGoogle.vue";
import MenuIzquierda from "./components/MenuIzquierda.vue";


export default {
  name: "App",
  components: {
    MapaGoogle,
    MenuIzquierda
},
};

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  color: #2c3e50;
  
  
}
.vue-map-container{
  position: absolute;
  width: 100%;
  height: 100vh;
  bottom:  1px;
  
}

#contenedor{

  
}
</style>
