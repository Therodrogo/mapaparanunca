<script>
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Map,
  },
};

</script>


<template>


<div id="ca">
  <Map/>
</div>
  


</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  color: #2c3e50;
  position: relative;
  
}
.vue-map-container{
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100vh;
  background-color: azure;

}
</style>
