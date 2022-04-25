<template>
<div>
  <div v-if="muestrate">

    <InformacionEdifcio 
      :texto="palabra"
      :urlFoto="urlFoto"
      :descripcion="descripcion"
      :salas="salasEdificio"
      
    />
  </div>
  
  <div id="map" />
</div>

</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from "vue";
import InformacionEdifcio from "./InformacionEdifcio.vue";

export default {
  components: {
    InformacionEdifcio,
  },
  data(){
    return{
      estado: false

    }
  },
  methods:{
    
  },

  setup() {
    var muestrate = ref(false);
    var palabra = ref('hola');
    var urlFoto = ref('');
    var descripcion = ref('')
    var salasEdificio = ref([])
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoidGhlcm9kcm9nbyIsImEiOiJjbDIxYTNlMG4xNGlyM2puM3JuemU5ZThvIn0.JNkviaRn-Zb2qdTue-L4VQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/therodrogo/cl26vlm2v001o15nkk0ouo4j1",
        center: [-71.23, -35.003],
        zoom: 16.67,
        //scrollZoom: false
      });

      map.on("load", () => {
        //Ruta desde la entrada al camino principal,
        //COMPLETA EL MAPA UN POCO
        map.addSource("route2", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [-71.229743, -35.001366],
                [-71.22994511197385, -35.00155877796714],
              ],
            },
          },
        });

        map.addLayer({
          id: "route2",
          type: "line",
          source: "route2",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FFFFFF",
            "line-width": 3,
          },
        });
      });
      // Funcion que agrega un Marker al mapa, se le entrega el icono, la coordenada y un popup.
      function agregarMarker(icono, coordenada, popup) {
        //Elemento
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(` + icono + `)`;
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.backgroundSize = "100%";

        //Marker
        const marker = new mapboxgl.Marker(el);
        marker.setLngLat(coordenada);
        marker.setPopup(popup);
        marker.addTo(map);

        //Eventos Marker
        //Evento de pasar el mouse por encima
        marker.getElement().addEventListener("mouseover", () => {
          marker.getElement().style.width = "40px";
          marker.getElement().style.height = "40px";
        });
        //Evento de quitar el mouse de encima
        marker.getElement().addEventListener("mouseleave", () => {
          marker.getElement().style.width = "30px";
          marker.getElement().style.height = "30px";
        });

        return marker;
      }

      // Funcion que crea y devuelve un Popup, la uso para enviar Popups a la funcion agregarMarker. Se le entrega el texto que se quiere usar.
      function crearPopUp(texto) {
        const popup = new mapboxgl.Popup({ closeOnClick: false }).setText(
          "" + texto
        );
        popup.setMaxWidth("relative");

        return popup;
      }

      //Gimnasio (Está separado de los demas porque tiene la linea)
      var coordenada = [-71.23020173932005, -35.00298450172138];
      var popUpGim = crearPopUp("Gimnasio");
      var gimnasio = agregarMarker(
        "https://img.icons8.com/ios-filled/344/4a90e2/gum-.png",
        coordenada,
        popUpGim
      );
      //Array de puntos para crear la ruta
      var rutaGim = [
        [-71.229743, -35.001366],
        [-71.22994865395084, -35.00156334164443],
        [-71.23051187712394, -35.0019471982832],
        [-71.23052528816918, -35.00195818370616],
        [-71.23055479246803, -35.00207462909723],
        [-71.23054942805044, -35.00217789185287],
        [-71.23053869921357, -35.00222622756549],
        [-71.23034858114417, -35.002421101025526],
        [-71.23018757073696, -35.00266818850676],
        [-71.23005813231264, -35.00274708842888],
        [-71.22996781644146, -35.002752625461746],
        [-71.22996030542906, -35.00281670990734],
        [-71.22994108857104, -35.00287023559107],
        [-71.23001279480857, -35.00292253568179],
      ];

      gimnasio.getElement().addEventListener("click", () => {
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Gimnasio';
        urlFoto.value = 'https://i.ibb.co/Pms6TPr/gimnacio.png'
        descripcion.value ="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.  una galería de textos y de . "
        salasEdificio.value = ['Sala 1','Sala 2','Sala 3'];

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });
      //Evento al cerrar el PopUp del Gim
      popUpGim.on("close", () => {
        // BORRAR LINEA
        map.removeLayer("gimnasio");
        map.removeSource("gimnasio");
      });

      //Evento de pasar el mouse por encima
      gimnasio.getElement().addEventListener("mouseover", () => {
        gimnasio.getElement().style.width = "40px";
        gimnasio.getElement().style.height = "40px";
        map.removeLayer();
        //var a = new InformacionEdifcio();
        //a.visibleTarjeta();
        crearRuta(rutaGim);
      });
      //Evento de quitar el mouse de encima
      gimnasio.getElement().addEventListener("mouseleave", () => {
        gimnasio.getElement().style.width = "30px";
        gimnasio.getElement().style.height = "30px";
        /* map.removeLayer('points')
        map.removeSource('point')
        map.removeImage("cat") */

        map.removeLayer("gimnasio");
        map.removeSource("gimnasio");
      });

      //Marker 2 usado para determinar coordenadas
      // const marker2 = new mapboxgl.Marker();
      // marker2.setLngLat([-71.22929, -35.001566]);
      // //EL ADDTO MAP DEBE ESTAR AL FINAL O NO CORRE XD
      // //popup del marker usado para sacar posiciones
      // const popup = new mapboxgl.Popup({ closeOnClick: false })
      //   .setLngLat([-71.22929, -35.001566])
      //   .setMaxWidth("100px")
      //   .setHTML(marker2.getLngLat());

      // popup.addTo(map);

      // //MARKER DE ENTRADA MALA
      // marker2.getElement().addEventListener("click", () => {
      //   //CREAR LINEA AMARILLA DENUEVO
      //   //Zoom a una posición especifica
      //   //map.zoomTo(20.01,[-71.230,-35.003] );
      //   //   Para saber la posicion del marker 2
      //   popup.setHTML(marker2.getLngLat());
      // });
      // marker2.setDraggable(true);
      // marker2.addTo(map);

      //Crea todos los edificios, la cree para podere minimizar el codigo de abajo :9
      crearMarkersEdificios();

      function crearMarkersEdificios() {
        //Creación de Markers

        //ENTRADA
        var coordenada = [-71.229743, -35.001366];
        agregarMarker(
          "https://img.icons8.com/external-flatarticons-blue-flatarticons/344/external-entrance-usa-flatarticons-blue-flatarticons-2.png",
          coordenada,
          crearPopUp("Entrada")
        );

        //MINAS
        coordenada = [-71.23095415504667, -35.00135123097902];
        agregarMarker(
          "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/4a90e2/external-mine-investment-kiranshastry-solid-kiranshastry.png",
          coordenada,
          crearPopUp("Minas")
        );

        //MECATRONICA
        coordenada = [-71.2290760294051, -35.00188500863207];
        agregarMarker(
          "https://img.icons8.com/ultraviolet/344/robot--v1.png",
          coordenada,
          crearPopUp("Mecatronica")
        );

        //MECANICA
        coordenada = [-71.22886378003142, -35.002003009634954];
        agregarMarker(
          "https://img.icons8.com/office/344/car.png",
          coordenada,
          crearPopUp("Mecanica")
        );

        //CONSTRUCCION
        coordenada = [-71.2291604784214, -35.003168465316016];
        agregarMarker(
          "https://img.icons8.com/ultraviolet/344/hammer.png",
          coordenada,
          crearPopUp("Construccion")
        );

        //OBRAS
        coordenada = [-71.22907482062429, -35.00336695439614];
        agregarMarker(
          "https://img.icons8.com/ultraviolet/344/workers-male.png",
          coordenada,
          crearPopUp("Obras")
        );

        //AUDITORIO
        coordenada = [-71.22915475374442, -35.00365484351161];
        agregarMarker(
          "https://img.icons8.com/fluency-systems-filled/344/4a90e2/coliseum.png",
          coordenada,
          crearPopUp("Auditorio")
        );

        //EDIFICIO AZUL
        coordenada = [-71.22979433407157, -35.0017047386893];
        agregarMarker(
          "https://img.icons8.com/color/344/link-company-child.png",
          coordenada,
          crearPopUp("Edificio Azul")
        );

        //EDIFICIO VERDE
        coordenada = [-71.22999896811982, -35.002471304966534];
        agregarMarker(
          "https://img.icons8.com/external-phatplus-solid-phatplus/344/4a90e2/external-laboratory-virus-transmission-phatplus-solid-phatplus.png",
          coordenada,
          crearPopUp("Edificio Verde")
        );

        //Servicio Estudiantil
        coordenada = [-71.22980662330485, -35.0020445830408];
        agregarMarker(
          "https://img.icons8.com/ios-glyphs/344/4a90e2/education.png",
          coordenada,
          crearPopUp("Servicio Estudiantil")
        );

        //Biblioteca
        coordenada = [-71.22892109676758, -35.00283153433725];
        agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/library.png",
          coordenada,
          crearPopUp("Biblioteca")
        );

        //Electrica
        coordenada = [-71.23129613592188, -35.0020916923508];
        agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/electrical.png",
          coordenada,
          crearPopUp("Electrica")
        );

        //CABAÑA MADERA
        coordenada = [-71.22897841350172, -35.002423278615076];
        agregarMarker(
          "https://img.icons8.com/external-icongeek26-glyph-icongeek26/344/4a90e2/external-cabin-russia-icongeek26-glyph-icongeek26.png",
          coordenada,
          crearPopUp("Cabaña Madera")
        );

        //SERVICIOS MULTIPLES
        coordenada = [-71.2302405610473, -35.00213003797558];
        agregarMarker(
          "https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png",
          coordenada,
          crearPopUp("Cabaña Madera")
        );
        //COE
        coordenada = [-71.22955876785723, -35.00311601562916];
        agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/book.png",
          coordenada,
          crearPopUp("COE")
        );

        const navegacionControl = new mapboxgl.NavigationControl();
        map.addControl(navegacionControl, "bottom-right");
        map.setMinZoom(16.39);
        map.setMaxZoom(18);
      }
      /* function CargarImagen(url,coords){
        map.loadImage(url,
        (error, image) => {
          if (error) throw error;
 
            // Add the image to the map style.
            map.addImage('cat', image);
 
          // Add a data source containing one point feature.
            map.addSource('point', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': [
                  {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Point',
                      'coordinates': coords
                    }
                  }
                ]
              }
            });
            map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'point', // reference the data source
              'layout': {
                'icon-image': 'cat', // reference the image
                'icon-size': 0.25
              }
            });
        }       
      );
      } */

      function crearRuta(coordenadas) {
        map.addSource("gimnasio", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordenadas,
            },
          },
        });
        map.addLayer({
          id: "gimnasio",
          type: "line",
          source: "gimnasio",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FFFF00",
            "line-width": 4,
          },
        });
      }
    });
    return { 
      muestrate,
      palabra,
      urlFoto,
      descripcion,
      salasEdificio
    };
  },
};
</script>

<style>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 1px;
  z-index: 5;
}
</style>