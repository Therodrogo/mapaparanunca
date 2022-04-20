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
        style: "mapbox://styles/therodrogo/cl26vlm2v001o15nkk0ouo4j1",
        center: [-71.230,-35.003 ], 
        zoom: 16.67,
        //scrollZoom: false

      })
    
    
      
     map.on('load', () => {
       
        //Ruta desde la entrada al camino principal, 
        //COMPLETA EL MAPA UN POCO
         map.addSource('route2', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        [-71.229743, -35.001366],
        [-71.22994511197385, -35.00155877796714]
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
        'line-color': '#FFFFFF',
        'line-width': 3
        }
      });

});

        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(https://img.icons8.com/ios-filled/344/4a90e2/gum-.png)`;
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.backgroundSize = '100%';
    //  const algo = map.getSource('route2');
        
//Gimnasio
        const marker1 = new mapboxgl.Marker(el)
        marker1.getElement().addEventListener('click', () => {
          
         // map.zoomTo(20.01,[-71.230,-35.003] );
//AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
            // map.addSource('gimnasio', {
            //     'type': 'geojson',
            //     'data': {
            //     'type': 'Feature',
            //     'properties': {},
            //     'geometry': {
            //     'type': 'LineString',
            //     'coordinates': [
            //     [-71.230,-35.003],
            //     [-71.229743, -35.001366]
            //     ]
            //     }
            //    }
            //   });
                
            //     map.addLayer({
            //     'id': 'gimnasio',
            //     'type': 'line',
            //     'source': 'gimnasio',
            //     'layout': {
            //     'line-join': 'round',
            //     'line-cap': 'round'
            //     },
            //     'paint': {
            //     'line-color': '#FFFF00',
            //     'line-width': 7
            //     }
            //   });
         
        });

      // BORRAR LINEA
      //  map.removeLayer('route2');
      //    map.removeSource('route2');
       
        marker1.setLngLat([-71.23020173932005, -35.00298450172138]);
        marker1.addTo(map);



      //Marker 2 usado para determinar coordenadas
      const marker2 = new mapboxgl.Marker()
      marker2.setLngLat([-71.22929, -35.001566]);
      //EL ADDTO MAP DEBE ESTAR AL FINAL O NO CORRE XD
//popup del marker usado para sacar posiciones
     // const popup = new mapboxgl.Popup({ closeOnClick: false })
          // .setLngLat([-71.22929, -35.001566])
          // .setMaxWidth('100px')
          // .setHTML(marker2.getLngLat())
         
    //  popup.addTo(map);

      //MARKER DE ENTRADA MALA
      marker2.getElement().addEventListener('click', () => {

        //CREAR LINEA AMARILLA DENUEVO
          //Zoom a una posición especifica 
          //map.zoomTo(20.01,[-71.230,-35.003] );

       //   Para saber la posicion del marker 2
        //  popup.setHTML(marker2.getLngLat())
       
        
        });
        marker2.setDraggable(true);
     // marker2.addTo(map);

      //Entrada
      var entrada_el = document.createElement('div');
      entrada_el.className = 'marker';
      entrada_el.style.backgroundImage = `url(https://img.icons8.com/external-flatarticons-blue-flatarticons/344/external-entrance-usa-flatarticons-blue-flatarticons-2.png)`;
      entrada_el.style.width = '40px';
      entrada_el.style.height = '40px';
      entrada_el.style.backgroundSize = '100%';
      const marker3 = new mapboxgl.Marker(entrada_el)
      marker3.setLngLat([-71.229743, -35.001366]);
      //marker3.setHTML("ENTRADA"); 
      //EL ADDTO MAP DEBE ESTAR AL FINAL O NO CORRE XD
      marker3.addTo(map);

      var minas_el = document.createElement('div');
      minas_el.className = 'marker';
      minas_el.style.backgroundImage = `url(https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/4a90e2/external-mine-investment-kiranshastry-solid-kiranshastry.png)`;
      minas_el.style.width = '40px';
      minas_el.style.height = '40px';
      minas_el.style.backgroundSize = '100%';
     const marker4 = new mapboxgl.Marker(minas_el)
      marker4.setLngLat([ -71.23095415504667, -35.00135123097902]);
      marker4.addTo(map);


 
    //mecatro y meca
      var mecat_el = document.createElement('div');
      mecat_el.className = 'marker';
      mecat_el.style.backgroundImage = `url(https://img.icons8.com/ultraviolet/344/robot--v1.png)`;
      mecat_el.style.width = '40px';
      mecat_el.style.height = '40px';
      mecat_el.style.backgroundSize = '100%';
     const marker5 = new mapboxgl.Marker(mecat_el)
      marker5.setLngLat([ -71.2290760294051, -35.00188500863207]);
      marker5.addTo(map);

      var meca_el = document.createElement('div');
      meca_el.className = 'marker';
      meca_el.style.backgroundImage = `url(https://img.icons8.com/office/344/car.png)`;
      meca_el.style.width = '30px';
      meca_el.style.height = '30px';
      meca_el.style.backgroundSize = '100%';
     const marker6 = new mapboxgl.Marker(meca_el)
      marker6.setLngLat([ -71.22886378003142, -35.002003009634954]);
      marker6.addTo(map);
     
     //contru y obras
      var contru_el = document.createElement('div');
      contru_el.className = 'marker';
      contru_el.style.backgroundImage = `url(https://img.icons8.com/ultraviolet/344/hammer.png)`;
      contru_el.style.width = '30px';
      contru_el.style.height = '30px';
      contru_el.style.backgroundSize = '100%';
     const markercontru = new mapboxgl.Marker(contru_el)
      markercontru.setLngLat([   -71.2291604784214, -35.003168465316016]);
      markercontru.addTo(map);
   
        var obra_el = document.createElement('div');
       obra_el .className = 'marker';
       obra_el .style.backgroundImage = `url(https://img.icons8.com/ultraviolet/344/workers-male.png)`;
       obra_el .style.width = '30px';
       obra_el .style.height = '30px';
       obra_el .style.backgroundSize = '100%';
     const markerobra = new mapboxgl.Marker( obra_el )
      markerobra.setLngLat([-71.22907482062429, -35.00336695439614]);
      markerobra.addTo(map);

      //Auditorio??????????????
      var auditorio_el = document.createElement('div');
       auditorio_el .className = 'marker';
       auditorio_el .style.backgroundImage = `url(https://img.icons8.com/fluency-systems-filled/344/4a90e2/coliseum.png)`;
       auditorio_el .style.width = '30px';
       auditorio_el .style.height = '30px';
       auditorio_el .style.backgroundSize = '100%';
     const markeraudi = new mapboxgl.Marker( auditorio_el )
      markeraudi.setLngLat([-71.22915475374442, -35.00365484351161]);
      markeraudi.addTo(map);

      //edificio azul???????????
      var azul_el = document.createElement('div');
       azul_el .className = 'marker';
       azul_el .style.backgroundImage = `url(https://img.icons8.com/color/344/link-company-child.png)`;
       azul_el .style.width = '30px';
       azul_el .style.height = '30px';
       azul_el .style.backgroundSize = '100%';
     const markeedazul = new mapboxgl.Marker( azul_el )
      markeedazul.setLngLat([-71.22979433407157, -35.0017047386893]);
      markeedazul.addTo(map);
      
        //edificio verde???????????
      var verde_el = document.createElement('div');
       verde_el .className = 'marker';
       verde_el .style.backgroundImage = `url(https://img.icons8.com/external-phatplus-solid-phatplus/344/4a90e2/external-laboratory-virus-transmission-phatplus-solid-phatplus.png)`;
       verde_el .style.width = '30px';
       verde_el .style.height = '30px';
       verde_el .style.backgroundSize = '100%';
     const markeedverde = new mapboxgl.Marker( verde_el )
      markeedverde.setLngLat([-71.22999896811982, -35.002471304966534]);
      markeedverde.addTo(map);

           //servicio estudiantil???????????
      var servicio_el = document.createElement('div');
       servicio_el .className = 'marker';
       servicio_el .style.backgroundImage = `url(https://img.icons8.com/ios-glyphs/344/4a90e2/education.png)`;
       servicio_el .style.width = '30px';
       servicio_el .style.height = '30px';
       servicio_el .style.backgroundSize = '100%';
     const marketservi = new mapboxgl.Marker( servicio_el )
      marketservi.setLngLat([-71.22980662330485, -35.0020445830408]);
      marketservi.addTo(map);

      //library??????????
      var libra_el = document.createElement('div');
       libra_el .className = 'marker';
       libra_el .style.backgroundImage = `url(https://img.icons8.com/ios-filled/344/4a90e2/library.png)`;
       libra_el .style.width = '30px';
       libra_el .style.height = '30px';
       libra_el .style.backgroundSize = '100%';
     const marketlibra = new mapboxgl.Marker( libra_el )
      marketlibra.setLngLat([-71.22892109676758, -35.00283153433725]);
      marketlibra.addTo(map);



      //electro??????????
      var electro_el = document.createElement('div');
       electro_el .className = 'marker';
       electro_el .style.backgroundImage = `url(https://img.icons8.com/ios-filled/344/4a90e2/electrical.png)`;
       electro_el .style.width = '30px';
       electro_el .style.height = '30px';
       electro_el .style.backgroundSize = '100%';
     const marketelec = new mapboxgl.Marker( electro_el )
      marketelec.setLngLat([-71.23129613592188, -35.0020916923508]);
      marketelec.addTo(map);


      //CABAÑA MADERA 
       var madera_el = document.createElement('div');
       madera_el .className = 'marker';
       madera_el .style.backgroundImage = `url(https://img.icons8.com/external-icongeek26-glyph-icongeek26/344/4a90e2/external-cabin-russia-icongeek26-glyph-icongeek26.png)`;
       madera_el .style.width = '30px';
       madera_el .style.height = '30px';
       madera_el .style.backgroundSize = '100%';
       const markermade = new mapboxgl.Marker( madera_el )
      markermade.setLngLat([-71.22897841350172, -35.002423278615076]);
      markermade.addTo(map);

      //SERVICIOS MULTIPLES Y COE
        var sm_el = document.createElement('div');
       sm_el .className = 'marker';
       sm_el .style.backgroundImage = `url(https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png)`;
       sm_el .style.width = '30px';
       sm_el .style.height = '30px';
       sm_el .style.backgroundSize = '100%';
       const markersm = new mapboxgl.Marker( sm_el );
      markersm.setLngLat([-71.2302405610473, -35.00213003797558]);
      markersm.addTo(map);

  
 var coe_el = document.createElement('div');
       coe_el .className = 'marker';
       coe_el .style.backgroundImage = `url(https://img.icons8.com/ios-filled/344/4a90e2/book.png)`;
       coe_el .style.width = '30px';
       coe_el .style.height = '30px';
       coe_el .style.backgroundSize = '100%';
       const markercoe = new mapboxgl.Marker( coe_el )
      markercoe.setLngLat([-71.22955876785723, -35.00311601562916]);
      markercoe.addTo(map);

        const navegacionControl = new mapboxgl.NavigationControl();
        map.addControl(navegacionControl,'bottom-right'); 
        map.setMinZoom(16.39);
        map.setMaxZoom(18);

      


        
  
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