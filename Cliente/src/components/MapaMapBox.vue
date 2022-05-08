<template>
  <div>
    <div v-if="muestrate">
      <InformacionEdifcio
        @reserve="porfaFunca"
        :texto="palabra"
        :urlFoto="urlFoto"
        :descripcion="descripcion"
        :salas="salasEdificio"
        :algoalgo="monitomonito"
      />

    </div>
    
    <div id="map" />
    <div class="prueba">
      {{nombreEdificioCurso}}
    </div>
  </div>
</template>

<script>
var muestrate = ref(false);
var palabra = ref("hola");

var urlFoto = ref("");
var descripcion = ref("");
var salasEdificio = ref([]);
var monitomonito = ref("lalalalala");
var posiMonito = ref("lelel");
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ref } from "vue";
import InformacionEdifcio from "./InformacionEdifcio.vue";
import API from "@/api";

export default {
  components: {
    InformacionEdifcio,
  },
  data() {
    return {
      estado: false,
      salas2: [],
      hola:"funciona"
    };
  },
  methods: {
    
    porfaFunca() {

      muestrate.value = false;
      
      
    },
    
  },
  props:{
    nombreEdificioCurso:String
  },
  mounted() {
      console.log("fin")
      mapboxgl.accessToken =
        "pk.eyJ1IjoidGhlcm9kcm9nbyIsImEiOiJjbDIxYTNlMG4xNGlyM2puM3JuemU5ZThvIn0.JNkviaRn-Zb2qdTue-L4VQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/therodrogo/cl26vlm2v001o15nkk0ouo4j1",
        center: [-71.23, -35.003],
        zoom: 16.67,
        //scrollZoom: false
      });
      map.on('click', function(e) {

      console.log("["+e.lngLat.lng+","+e.lngLat.lat+"]")

      })
      
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
      map.on('dblclick', (e) => {
        e.preventDefault();
      });
      map.on('mouseover', () => {

        if (muestrate.value == false) {
            borrarRuta();
            desestacarMarkers();
          }

      })
      
      // Variable para indicar si un edifico se encuentra destacado
      var edificioDestacado=false;
      //Variable para indentificar el numero del edificioDestacado
      var nroDestacado;
      //Array de los markers de edicios
      var arrayMarkers = [];

      //Marker
      const marker_monito = new mapboxgl.Marker();[-71.2297088791571,-35.00274229287036]
      marker_monito.setLngLat([-71.2297088791571,-35.00274229287036]);
      monitomonito.value=""+marker_monito.getLngLat();
      posiMonito.value=""+marker_monito.getLngLat();
      //monitomonito.value="[-71.2297088791571,-35.00274229287036]";

      marker_monito.addTo(map);

      marker_monito.setDraggable(true);
      
      marker_monito.getElement().addEventListener("click", () => {
        
        var posi =
          "[" +
          marker_monito.getLngLat().lng +
          ", " +
          marker_monito.getLngLat().lat +
          "]";
          marker_monito.getPopup().setText("" + posi);
      });
        
      marker_monito.on("dragstart", (e) => {
        console.log("event type:", e.type);
        //Borramos la ruta cuando mueva el monito
        borrarRuta();
        //Dejamos de destacar el edificio (Recorriendo la lista)
        desestacarMarkers();
        //Cerramos la ventana del edifico
        muestrate.value = false;
      });

       marker_monito.on("dragend", (e) => {
         console.log("event type:", e.type);
        posiMonito.value=""+marker_monito.getLngLat();
        monitomonito.value=""+marker_monito.getLngLat();
        console.log("damedamne "+ posiMonito.value);
      });
      //Crea todos los edificios, la cree para podere minimizar el codigo de abajo :9
      

      crearMarkersEdificios(this.hola);

      //Creación de Markers
      function crearMarkersEdificios(hola) {
        //Gimnasio (Está separado de los demas porque tiene la linea)
        console.log(hola)
        var coordenada = [-71.23020173932005, -35.00298450172138];
        var coordenada1 = coordenada;
        var gimnasio = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/gum-.png",
          coordenada
        );
        agregarEventoClick(
                gimnasio,
                coordenada1,
                "Gimnasio",
                "https://i.ibb.co/RBtgwP3/gimnacio.png",
                "Solo se imparten cursos deportivos",
                false,
               
        );

        //Agregamos el Gym a la lista de Markers
        arrayMarkers.push(gimnasio);
        //ENTRADA
        coordenada = [-71.229743, -35.001366];
        var entrada = agregarMarker(
          "https://img.icons8.com/external-flatarticons-blue-flatarticons/344/external-entrance-usa-flatarticons-blue-flatarticons-2.png",
          coordenada
        );

        //Fuuncion que agrega el evento click, lo hice para reducir lineas, el ultimo elemento que se entrega es si tiene salas. Si no = true, si tiene = false
        agregarEventoClick(
          entrada,
          coordenada,
          "Entrada",
          "",
          "Entrada Principal Paradero",
          false
        );

        //MINAS
        coordenada = [-71.23095415504667, -35.00135123097902];
        var coordenada3 = coordenada;
        var minas = agregarMarker(
          "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/4a90e2/external-mine-investment-kiranshastry-solid-kiranshastry.png",
          coordenada
        );
        agregarEventoClick(
          minas,
          coordenada3,
          "Edificio Minas",
          "https://i.ibb.co/zZC4j59/minas.png",
          "",
          true,
        );

        //MECANICA
        coordenada = [-71.22886378003142, -35.002003009634954];
        var coordenada4 = coordenada;

        var mecanica = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/robot--v1.png",
          coordenada
        );
        agregarEventoClick(
          mecanica,
          coordenada4,
          "Edificio de Mecanica",
          "https://i.ibb.co/7tSm92s/mecanica.png",
          "Incluye a Mecatrónica",
          true,
        );

        //CONSTRUCCION
        coordenada = [-71.2291604784214, -35.003168465316016];
        var coordenada5 = coordenada;
        var construccion = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/hammer.png",
          coordenada
        );
        agregarEventoClick(
          construccion,
          coordenada5,
          "Edificio Construccion",
          "https://i.ibb.co/D9rc60t/construccion.png",
          "Incluye a Obras Civiles",
          true,
        );

        //AUDITORIO
        coordenada = [-71.22915475374442, -35.00365484351161];
        var coordenada6 = coordenada;
        var auditorio = agregarMarker(
          "https://img.icons8.com/fluency-systems-filled/344/4a90e2/coliseum.png",
          coordenada
        );
        agregarEventoClick(
          auditorio,
          coordenada6,
          "Edificio I+D",
          "https://i.ibb.co/Ct9530g/ID.png",
          "Edificio de intercambio de idiomas",
          true,
        );

        //EDIFICIO AZUL
        coordenada = [-71.22979433407157, -35.0017047386893];

        var coordenada7 = coordenada;
        var facultad = agregarMarker(
          "https://img.icons8.com/color/344/link-company-child.png",
          coordenada
        );
        agregarEventoClick(
          facultad,
          coordenada7,
          "Facultad de Ingeniería",
          "https://i.ibb.co/dKb7b8b/facultad.png",
          "Solo administrativo",
          false,
        );

        //EDIFICIO VERDE
        coordenada = [-71.22999896811982, -35.002471304966534];
        var coordenada8 = coordenada;
        var laboratorio = agregarMarker(
          "https://img.icons8.com/external-phatplus-solid-phatplus/344/4a90e2/external-laboratory-virus-transmission-phatplus-solid-phatplus.png",
          coordenada
        );
        agregarEventoClick(
          laboratorio,
          coordenada8,
          "Edificios Laboratorios",
          "https://i.ibb.co/ZJjwCRx/laboratorio.png",
          "",
          true,
        );

        //Bienestar Estudiantil
        coordenada = [-71.22980662330485, -35.0020445830408];
        var coordenada9 = coordenada;
        var bienestar = agregarMarker(
          "https://img.icons8.com/ios-glyphs/344/4a90e2/education.png",
          coordenada
        );
        agregarEventoClick(
          bienestar,
          coordenada9,
          "Edificio Estudiantil",
          "https://i.ibb.co/0YHF0hD/bienestar.png",
          "",
          true,
        );

        //Biblioteca
       
        coordenada =[-71.22894013559387, -35.002824873000314];
      
        var coordenada10 = coordenada;
        var biblioteca = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/library.png",
          coordenada
        );
        agregarEventoClick(
          biblioteca,
          coordenada10,
          "Biblioteca",
          "https://i.ibb.co/R6WsF6Z/biblioteca.png",
          "Al lado de esta es el auditorio",
          true,
        );

        //Electrica
        coordenada = [-71.23129613592188, -35.0020916923508];
        var coordenada11 = coordenada;
        var electrica = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/electrical.png",
          coordenada
        );
        agregarEventoClick(
          electrica,
          coordenada11,
          "Eléctrica",
          "https://i.ibb.co/k8374K4/electrica.png",
          "No se imparten cursos en este edificio por el momento",
          false
        );

        var coordenada12 = coordenada;
        var cabaña = agregarMarker(
          "https://img.icons8.com/external-icongeek26-glyph-icongeek26/344/4a90e2/external-cabin-russia-icongeek26-glyph-icongeek26.png",
          coordenada
        );
        agregarEventoClick(
          cabaña,
          coordenada12,
          "Salas de Madera",
          "https://i.ibb.co/ZdrjXrt/maderas.png",
          "",
          true,
        );

        var coordenada13 = coordenada;
        var multiples = agregarMarker(
          "https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png",
          coordenada
        );
        agregarEventoClick(
          multiples,
          coordenada13,
          "Servicios Multiples",
          "https://i.ibb.co/7C8VYBR/multiples.png",
          "",
          true,
        );

        //COE
        coordenada = [-71.22955876785723, -35.00311601562916];
        
        var coordenada14 = coordenada;
        var coe = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/book.png",
          coordenada
        );
        agregarEventoClick(
          coe,
          coordenada14,
          "Edificio Salas S",
          "https://i.ibb.co/D4BCFSf/salasS.png",
          "",
          true,
        );

        const navegacionControl = new mapboxgl.NavigationControl();
        map.addControl(navegacionControl, "bottom-right");
        map.setMinZoom(16.39);
        map.setMaxZoom(18);
      }
     
      function crearRuta(coordenadas) {

        if(map.getSource("ruta")!==undefined){
          map.removeLayer("ruta")
          map.removeSource("ruta")
        }
        map.addSource("ruta", {
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
          id: "ruta",
          type: "line",
          source: "ruta",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FF0000", //color rojo para la ruta
            "line-width": 4,
          },
        });
      }
      function borrarRuta() {
         if(map.getSource("ruta")!==undefined){
          map.removeLayer("ruta")
          map.removeSource("ruta")
        }
      }
     
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
          marker.getElement().style.width = "60px";
          marker.getElement().style.height = "60px";
          marker.getElement().style.transition = "0.2s";
          marker.getElement().style.borderRadius = "25%";
          marker.getElement().style.border = "2px solid red";
          
    
        });
        //Evento de quitar el mouse de encima
        marker.getElement().addEventListener("mouseleave", () => {
          //Si el edificio no se encuentra destacado (No se le ha echo click) este vuelve a su estado natural.
          if (!edificioDestacado) {
            
            marker.getElement().style.width = "30px";
            marker.getElement().style.height = "30px";
            marker.getElement().style.backgroundColor = "transparent";
            marker.getElement().style.border = "none";
            marker.getElement().style.transition = "none";
          }else{
            //Si existe un edifico destacado, hacemos que deje de destacarse si no es el ya destacado.
       
            if (arrayMarkers[nroDestacado]!=marker) {
                marker.getElement().style.width = "30px";
                marker.getElement().style.height = "30px";
                marker.getElement().style.backgroundColor = "transparent";
                marker.getElement().style.border = "none";
                marker.getElement().style.transition = "none";
            }

          }

        });
        //Lo agregmos a la lista de markers
        //Agregamos el Gym a la lista de Markers
        arrayMarkers.push(marker);
        return marker;
      }

      function desestacarMarkers(){
        for (let index = 0; index < arrayMarkers.length; index++) {
          arrayMarkers[index].getElement().style.width = "30px";
          arrayMarkers[index].getElement().style.height = "30px";
          arrayMarkers[index].getElement().style.backgroundColor = "transparent";
          arrayMarkers[index].getElement().style.border = "none";
          arrayMarkers[index].getElement().style.transition = "none";
        }
        
        edificioDestacado=false;
      }

      async function getSalas(){
            salasEdificio.value = await API.getSalasByName(palabra.value);
            
          }
      async function agregarEventoClick(
        marker,
        e_palabra,
        e_url,
        e_descripcion,
        e_salas,
      ) {
        marker.getElement().addEventListener("click", () => {
          //Si la ventana está oculta la mostramos
          if (!muestrate.value) {
            muestrate.value = !muestrate.value;
            palabra.value = e_palabra;
            urlFoto.value = e_url;
            descripcion.value = e_descripcion;
            salasEdificio.value = getSalas()
          }else{
            //Si no está oculta actualizamos sus datos
            palabra.value = e_palabra;
            urlFoto.value = e_url;
            descripcion.value = e_descripcion;
            salasEdificio.value = getSalas()
          }
         // marker = agregarMarker2(e_coordenada);
          
         


          //Desestacamos todos los edificos
          desestacarMarkers();
          //Se destaca el edifico

          if (edificioDestacado) {
            marker.getElement().style.width = "30px";
            marker.getElement().style.height = "30px";
            marker.getElement().style.backgroundColor = "transparent";
            marker.getElement().style.border = "none";
            marker.getElement().style.transition = "none";
            edificioDestacado=false;
           
            
          }else{
            marker.getElement().style.width = "60px";
            marker.getElement().style.height = "60px";
            marker.getElement().style.transition = "0.2s";
            marker.getElement().style.borderRadius = "25%";
            marker.getElement().style.border = "2px solid red";
            edificioDestacado=true;
            
          }
          //Se indica que nro de edicio fue destacado
          for (let index = 0; index < arrayMarkers.length; index++) {
            if (arrayMarkers[index]==marker) {
              nroDestacado=index;
              console.log("Edifico destacado nro: "+nroDestacado);
            }
            
          }
          
          //Tiene salas o no
          if (e_salas == false) {
           salasEdificio.value = ["---"];
          } else {
            getSalas(palabra.value)
          }
          API.CercanoUsuario(marker_monito.getLngLat().lng,marker_monito.getLngLat().lat)         
          crearRuta(API.setGraphInfo(palabra.value))

        });
      }
    
    return {
      muestrate,
      palabra,
      urlFoto,
      descripcion,
      salasEdificio,
      monitomonito,
      posiMonito,
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
.prueba{
  position: absolute;
  z-index: 100000;
  width: 200px;
  height: 100px;
}
</style>