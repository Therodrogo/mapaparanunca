<template>
  <div class="menuEstudiante">
    
    <MenuSuperior
      nombreUsuario="Rodrigo López"
      menuEstudiante=true
    />
    <MapaMapBox/>
  </div>
</template>


<script>
import MenuSuperior from "@/components/MenuSuperior.vue"
import MapaMapBox from "@/components/MapaMapBox.vue"

export default{
  components:{
    MenuSuperior,
    MapaMapBox

  }

}
</script>