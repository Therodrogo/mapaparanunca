<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <div>hola</div>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <MapaMapBox/>
    </v-main>
  </v-app>
</template>

<script>
import MapaMapBox from "./MapaMapBox.vue";
  export default {
    data: () => ({ drawer: null }),
    components: { 
      MapaMapBox,
      
    }
}
</script>

<style>
  

</style>