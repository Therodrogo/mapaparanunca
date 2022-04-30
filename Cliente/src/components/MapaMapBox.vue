<template>
<div>
  <div v-if="muestrate">

    <InformacionEdifcio 
      @reserve='porfaFunca'
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
var muestrate = ref(false);
    var palabra = ref('hola');
    var urlFoto = ref('');
    var descripcion = ref('')
    var salasEdificio = ref([])
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from "vue";
import InformacionEdifcio from "./InformacionEdifcio.vue";
import API from "@/api"

export default {
  components: {
    InformacionEdifcio,
  },
  data(){
    return{
      estado: false,
      salas2: []

    }
  },
  methods:{
     porfaFunca() {
       muestrate.value = false;
        

    },
  },
  
  setup() {
    
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
     //   el.style.display="inline-block";
       // el.style.position="absolute";

        //Marker
        const marker = new mapboxgl.Marker(el);
        marker.setLngLat(coordenada);
        marker.setPopup(popup);
        marker.addTo(map);

        //Eventos Marker
        //Evento de pasar el mouse por encima
        marker.getElement().addEventListener("mouseover", () => {
          marker.getElement().style.width = "60px";
          marker.getElement().style.height = "60px";
          marker.getElement().style.transition = "0.2s"
          marker.getElement().style.borderRadius = "50%"
          marker.getElement().style.border="2px solid #313C75"
          

        });
        //Evento de quitar el mouse de encima
        marker.getElement().addEventListener("mouseleave", () => {
          marker.getElement().style.width = "30px";
          marker.getElement().style.height = "30px";
          marker.getElement().style.backgroundColor = "transparent"
          marker.getElement().style.border="none"
        });

        return marker;
      }


function agregarMarker2(coordenada) {
        //Elemento
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(` + "https://img.icons8.com/fluency/344/marker-a.png" + `)`;
        el.style.width = "100px";
        el.style.height = "100px";
        el.style.backgroundSize = "100%";

        //Marker
        const marker = new mapboxgl.Marker(el);
        marker.setLngLat(coordenada);
       marker.addTo(map);
        

        //Eventos Marker
        //Evento de pasar el mouse por encima
        marker.getElement().addEventListener("mouseover", () => {
          marker.getElement().style.width = "40px";
          marker.getElement().style.height = "40px";
          
         
        });
        //Evento de quitar el mouse de encima
        marker.getElement().addEventListener("mouseleave", () => {
          marker.getElement().style.width = "80px";
          marker.getElement().style.height = "80px";
           marker.remove();
        });

        return marker;
      }















     
      //Gimnasio (Está separado de los demas porque tiene la linea)
      var coordenada = [-71.23020173932005, -35.00298450172138];
      var coordenada1 = coordenada
      var gimnasio = agregarMarker(
        "https://img.icons8.com/ios-filled/344/4a90e2/gum-.png",
        coordenada,
        
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

        gimnasio = agregarMarker2(
          coordenada1,
         );

        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);
        palabra.value = 'Gimnasio';
        urlFoto.value = 'https://i.ibb.co/RBtgwP3/gimnacio.png'
        descripcion.value ="Solo se imparten cursos deportivos"
        salasEdificio.value = ['Cancha'];

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
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

      //Crea todos los edificios, la cree para podere minimizar el codigo de abajo :9
      crearMarkersEdificios();

      function crearMarkersEdificios() {
        //Creación de Markers

        //ENTRADA
        
        var coordenada = [-71.229743, -35.001366];
        var coordenada2 = coordenada
        //var entrada2
        var entrada = agregarMarker(

          "https://img.icons8.com/external-flatarticons-blue-flatarticons/344/external-entrance-usa-flatarticons-blue-flatarticons-2.png",
          coordenada,
          
        );

       entrada.getElement().addEventListener("click", () => {

         entrada = agregarMarker2(
            
          coordenada2,
         );
     
         
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Entrada';
        urlFoto.value = ''
        descripcion.value ="Entrada Principal Paradero"
        salasEdificio.value = ['---'];

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      }); 


        






        //MINAS
        coordenada = [-71.23095415504667, -35.00135123097902];
        var coordenada3 = coordenada
       var minas = agregarMarker(
          "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/4a90e2/external-mine-investment-kiranshastry-solid-kiranshastry.png",
          coordenada,
        
        );

       minas.getElement().addEventListener("click", () => {


      minas = agregarMarker2(
          coordenada3,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);

        palabra.value = 'Edificio Minas';
        urlFoto.value = 'https://i.ibb.co/zZC4j59/minas.png'
        descripcion.value =""
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });

        //MECANICA
        coordenada = [-71.22886378003142, -35.002003009634954];
        var coordenada4 = coordenada
        var mecanica = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/robot--v1.png",
          coordenada,
       
        );

       mecanica.getElement().addEventListener("click", () => {


         mecanica = agregarMarker2(
          coordenada4,
         );

        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Edificio de Mecánica';
        urlFoto.value = 'https://i.ibb.co/7tSm92s/mecanica.png'
        descripcion.value ="Incluye a Mecatrónica"
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });





        //CONSTRUCCION
        coordenada = [-71.2291604784214, -35.003168465316016];
        var coordenada5 = coordenada
       var construccion = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/hammer.png",
          coordenada,
    
        );


       construccion.getElement().addEventListener("click", () => {
        
        construccion = agregarMarker2(
          coordenada5,
         );
        
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Edificio Construccion';
        urlFoto.value = 'https://i.ibb.co/D9rc60t/construccion.png'
        descripcion.value ="Incluye a Obras Civiles"
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()


       
  

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });

        //AUDITORIO
        coordenada = [-71.22915475374442, -35.00365484351161];
        var coordenada6 = coordenada
        var auditorio = agregarMarker(
          "https://img.icons8.com/fluency-systems-filled/344/4a90e2/coliseum.png",
          coordenada,
   
        );

       auditorio.getElement().addEventListener("click", () => {
        
        auditorio = agregarMarker2(
          coordenada6,
         );
        
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);
        palabra.value = 'Edificio I+D';
        urlFoto.value = 'https://i.ibb.co/Ct9530g/ID.png'
        descripcion.value ="Edificio de intercambio de idiomas"
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });

      //EDIFICIO AZUL
         coordenada = [-71.22979433407157, -35.0017047386893];
        var coordenada7 = coordenada
        var facultad = agregarMarker(
          "https://img.icons8.com/color/344/link-company-child.png",
          coordenada,
         
        );

       facultad.getElement().addEventListener("click", () => {
         facultad = agregarMarker2(
          coordenada7,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Facultad de Ingeniería';
        urlFoto.value = 'https://i.ibb.co/dKb7b8b/facultad.png'
        descripcion.value ="Solo administrativo"
        salasEdificio.value = ['---'];

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


        //EDIFICIO VERDE
        coordenada = [-71.22999896811982, -35.002471304966534];
        var coordenada8 = coordenada
        var laboratorio = agregarMarker(
          "https://img.icons8.com/external-phatplus-solid-phatplus/344/4a90e2/external-laboratory-virus-transmission-phatplus-solid-phatplus.png",
          coordenada,
        
        );

      
       laboratorio.getElement().addEventListener("click", () => {
         laboratorio = agregarMarker2(
          coordenada8,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);C

        palabra.value = 'Edificios Laboratorios';
        urlFoto.value = 'https://i.ibb.co/ZJjwCRx/laboratorio.png'
        descripcion.value =""
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


        //Bienestar Estudiantil
        coordenada = [-71.22980662330485, -35.0020445830408];
        var coordenada9 = coordenada
        var bienestar = agregarMarker(
          "https://img.icons8.com/ios-glyphs/344/4a90e2/education.png",
          coordenada,
          
        );

       bienestar.getElement().addEventListener("click", () => {
        
        bienestar = agregarMarker2(
          coordenada9,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Edificio Estudiantil';
        urlFoto.value = 'https://i.ibb.co/0YHF0hD/bienestar.png'
        descripcion.value =""
        API.getSalasByName(palabra.value)
       salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


        //Biblioteca
        coordenada = [-71.22892109676758, -35.00283153433725];
        var coordenada10 = coordenada
        var biblioteca = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/library.png",
          coordenada,
       
        );

       biblioteca.getElement().addEventListener("click", () => {
         biblioteca = agregarMarker2(
          coordenada10,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);

        palabra.value = 'Biblioteca';
        urlFoto.value = 'https://i.ibb.co/R6WsF6Z/biblioteca.png'
        descripcion.value ="Al lado de esta es el auditorio."
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


        //Electrica
        coordenada = [-71.23129613592188, -35.0020916923508];
        var coordenada11 = coordenada
        var electrica = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/electrical.png",
          coordenada,
      
        );
      
       electrica.getElement().addEventListener("click", () => {
         electrica = agregarMarker2(
          coordenada11,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);
        palabra.value = 'Eléctrica';
        urlFoto.value = 'https://i.ibb.co/k8374K4/electrica.png'
        descripcion.value ="No se imparten cursos en este edificio por el momento"
        salasEdificio.value = ['---'];

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


        //CABAÑA MADERA
        coordenada = [-71.22897841350172, -35.002423278615076];
        var coordenada12 = coordenada
        var cabaña = agregarMarker(
          "https://img.icons8.com/external-icongeek26-glyph-icongeek26/344/4a90e2/external-cabin-russia-icongeek26-glyph-icongeek26.png",
          coordenada,
        );

       cabaña.getElement().addEventListener("click", () => {
        
        cabaña = agregarMarker2(
          coordenada12,
         );
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);
        palabra.value = 'Salas de Madera';
        urlFoto.value = 'https://i.ibb.co/ZdrjXrt/maderas.png'
        descripcion.value =""
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });
        //SERVICIOS MULTIPLES
        coordenada = [-71.2302405610473, -35.00213003797558];
        var coordenada13 = coordenada
        var multiples = agregarMarker(
          "https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png",
          coordenada,
         
        );
       multiples.getElement().addEventListener("click", () => {
        
        multiples = agregarMarker2(
          coordenada13,
         );
        
        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Servicios Múltiples';
        urlFoto.value = 'https://i.ibb.co/7C8VYBR/multiples.png'
        descripcion.value =""
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()

        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


        //COE
        coordenada = [-71.22955876785723, -35.00311601562916];
        var coordenada14 = coordenada
        var coe = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/book.png",
          coordenada,
        
        );

      
       coe.getElement().addEventListener("click", () => {

         coe = agregarMarker2(
          coordenada14,
         );

        // map.zoomTo(20.01,[-71.230,-35.003] );
        // AÑADIR UNA LINEA DESDE LA ENTRADA AL GIMNASIO LETS GOOOOOOOO
        muestrate.value = !muestrate.value;
        //crearRuta(rutaGim);


        palabra.value = 'Edificio Salas S';
        urlFoto.value = 'https://i.ibb.co/D4BCFSf/salasS.png'
        descripcion.value =""
        API.getSalasByName(palabra.value)
        salasEdificio.value =API.getSalas()
        // this.ahoraSi= API.cambiar(this.ahoraSi);
        // this.borrar();
      });


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
  z-index: 9;
}
</style>