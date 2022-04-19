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
        //scrollZoom: false

      })
    
    
      
     map.on('load', () => {
        map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        [-71.230,-35.003],
        [-71.22929, -35.001566]
        ]
        }
        }
        });
      map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#FFFF00',
      'line-width': 8
      }
      });
});

        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(https://img.icons8.com/fluency/344/assassins-creed-logo.png)`;
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.backgroundSize = '100%';


        const marker1 = new mapboxgl.Marker(el)
        marker1.getElement().addEventListener('click', () => {
          
          map.zoomTo(20.01,[-71.230,-35.003] );
          
        });
        marker1.setLngLat([-71.230,-35.003]);
        marker1.addTo(map);
        marker1.setDraggable(true);
        //marker1.style.backgroundImage = ''

      const marker2 = new mapboxgl.Marker()
             

      marker2.setLngLat([-71.22929, -35.001566]);
      //EL ADDTO MAP DEBE ESTAR AL FINAL O NO CORRE XD
      marker2.addTo(map);

     

        //map.setZoom(map.getZoom()+1);
        const navegacionControl = new mapboxgl.NavigationControl();
        map.addControl(navegacionControl,'bottom-right'); 
        map.setMinZoom(16.39);
        map.setMaxZoom(18);
      

        const popup = new mapboxgl.Popup({ closeOnClick: false })
        popup.setLngLat([-71.230,-35.003])
        popup.setHTML('<h1>hola</h1>')
        marker1.setPopup(popup);
  
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
  z-index: 1;
}


</style>