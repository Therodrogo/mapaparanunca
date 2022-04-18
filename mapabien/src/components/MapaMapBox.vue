<template>

  <div id="map" />

</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoidGhlcm9kcm9nbyIsImEiOiJjbDIxYTNlMG4xNGlyM2puM3JuemU5ZThvIn0.JNkviaRn-Zb2qdTue-L4VQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/therodrogo/cl21eq4i2000d14o62ytfatjq",
        center: [-71.230,-35.003 ], 
        zoom: 16.67,
        scrollZoom: false
    
      })
      
      map.on('load', () => {
       
      });

        const marker1 = new mapboxgl.Marker()
        marker1.setLngLat([-71.230,-35.003]);
        marker1.addTo(map);
        marker1.setDraggable(true);
      
    });
    return {};
  },
};
</script>

<style>

#map {
 position: absolute;
  width: 100%;
  height: 100%;
  bottom:  1px;
}

</style>