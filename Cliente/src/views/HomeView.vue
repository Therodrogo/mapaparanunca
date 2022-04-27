
<template>
  <MenuSuperior/>
  <MapaMapBox/>

  

</template>

<script>

import MapaMapBox from '@/components/MapaMapBox.vue';
import MenuSuperior from '@/components/MenuSuperior.vue';

export default {
  
  name: 'HomeView',
  components: {
    MapaMapBox,
    MenuSuperior,
}
}
</script>
