
<template>
  <div>
    <MenuSuperior
      nombreUsuario="Iniciar Sesion"
    />
    <MapaMapBox/>
    
  </div>
  

</template>

<script>

import MenuSuperior from '@/components/MenuSuperior.vue';
import MapaMapBox from '@/components/MapaMapBox.vue';

export default {
  
  name: 'HomeView',
  components: {
    MenuSuperior,
    MapaMapBox
  }
}
</script>
