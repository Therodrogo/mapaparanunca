<template>
  <GMapMap 
    :center="center"
    :zoom="18"
    map-type-id="terrain"
    style="width: 100%; height: 100%;"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUi: false,
      disableDoubleClickZoom: true,
      draggable: false
    }"

  >
  
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
        :tittle="Algooooo"
      />
  </GMapMap>

</template>

<script>

export default {
  data() {
    return {
      center: { lat: -35.002688, lng: -71.229645 },
      markers: [
        {
          id: '1',
          position: {
            lat: -35.001265,
            lng: -71.230215,
          },
          
        },
        {
          position: {
            lat: -35.003058,
            lng: -71.230167,
          },
        },
        {
          position: {
            lat: -35.002158560804055,
            lng: -71.22923868237376,
          },
        },
        {
          position: {
            lat: 51.09256,
            lng: 6.84074,
          },
        },
      ],
    };
  },
};

</script>

<style>
body {
  margin: 0;
}
</style>