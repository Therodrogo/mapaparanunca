
<template>
  <MenuSuperior/>
  <MenuIzquierda/>
  <MapaMapBox/>

  

</template>

<script>

import MenuIzquierda from '@/components/MenuIzquierda.vue';
import MapaMapBox from '@/components/MapaMapBox.vue';
import MenuSuperior from '@/components/MenuSuperior.vue';

export default {
  
  name: 'HomeView',
  components: {
    MapaMapBox,
    MenuIzquierda,
    MenuSuperior,
}
}
</script>
