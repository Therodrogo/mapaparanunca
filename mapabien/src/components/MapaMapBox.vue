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
        'line-width': 7
        }
      });

         map.addSource('route2', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        [-71.230,-35.003],
        [-71.230529, -35.001914]
        ]
        }
        }
        });
                
        map.addLayer({
        'id': 'route2',
        'type': 'line',
        'source': 'route2',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#FFFF00',
        'line-width': 7
        }
      });

});

        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(https://img.icons8.com/fluency/344/assassins-creed-logo.png)`;
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.backgroundSize = '100%';
    //  const algo = map.getSource('route2');
        

        const marker1 = new mapboxgl.Marker(el)
        marker1.getElement().addEventListener('click', () => {
          
          map.zoomTo(20.01,[-71.230,-35.003] );
          map.removeLayer('route2');
          map.removeSource('route2');
        });

       
        marker1.setLngLat([-71.230,-35.003]);
        marker1.addTo(map);
        marker1.setDraggable(true);
        //marker1.style.backgroundImage = ''

      const marker2 = new mapboxgl.Marker()
      marker2.setLngLat([-71.22929, -35.001566]);
      //EL ADDTO MAP DEBE ESTAR AL FINAL O NO CORRE XD

      //MARKER DE ENTRADA MALA
      marker2.getElement().addEventListener('click', () => {

        //CREAR LINEA AMARILLA DENUEVO
          map.zoomTo(20.01,[-71.230,-35.003] );
       
          map.addSource('route2', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        [-71.230,-35.003],
        [-71.230529, -35.001914]
        ]
        }
        }
        });
                
        map.addLayer({
        'id': 'route2',
        'type': 'line',
        'source': 'route2',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#FFFF00',
        'line-width': 7
        }
      });
        });
        marker2.setDraggable(true);
      marker2.addTo(map);

      //Entrada
      const marker3 = new mapboxgl.Marker()
      marker3.setLngLat([-71.229743, -35.001366]);
      //marker3.setHTML("ENTRADA");
      //EL ADDTO MAP DEBE ESTAR AL FINAL O NO CORRE XD
      marker3.addTo(map);
      

//  -71.230529, -35.001914 Coordenadas para crear camino

     

        //map.setZoom(map.getZoom()+1);
        const navegacionControl = new mapboxgl.NavigationControl();
        map.addControl(navegacionControl,'bottom-right'); 
        map.setMinZoom(16.39);
        map.setMaxZoom(18);
      

        // const popup = new mapboxgl.Popup({ closeOnClick: false })
        // popup.setLngLat([-71.230,-35.003])
        // popup.setHTML('<h1>hola</h1>')
        // marker1.setPopup(popup);

      


        
  
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