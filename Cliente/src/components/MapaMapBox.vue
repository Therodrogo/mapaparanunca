<template>
  <div>
    <div v-if="muestrate">
      <InformacionEdifcio
        @reserve="porfaFunca"
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
var palabra = ref("hola");
var urlFoto = ref("");
var descripcion = ref("");
var salasEdificio = ref([]);
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from "vue";
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
    };
  },
  methods: {
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

     

      // marker monito
      var pop = new mapboxgl.Popup();
      var el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage =
        `url(` + "https://img.icons8.com/ultraviolet/344/walking.png" + `)`;
      el.style.width = "50px";
      el.style.height = "50px";
      el.style.backgroundSize = "100%";
      //   el.style.display="inline-block";
      // el.style.position="absolute";

      //Marker
      const marker_monito = new mapboxgl.Marker(el);
      marker_monito.setLngLat([-71.23294338288471, -35.00200300963659]);
      marker_monito.setPopup(pop);
      marker_monito.addTo(map);

      marker_monito.setDraggable(true);

      /*MIENTRAS MAS ARRIBA MAYOR ES LA LAT*/
      function ajustarRutaARRIBA(array) {
        var aux = array;
        var posicionMonito = marker_monito.getLngLat().toArray();
        for (var i = 0; i < array.length - 1; i++) {
          //Si el monito esta mas abajo se borra
          if (posicionMonito[1] < array[i][1]) {
            aux.splice(1, 1);
           // console.log(posicionMonito[1] + "ES MENOR" + array[i][1]);
           // var a = posicionMonito[0];
           // console.log("algo " + a);
            i = 0;
          }
        }
        return aux;
      }
      function ajustarRutaABAJO(array) {
        var aux = array;
        var posicionMonito = marker_monito.getLngLat().toArray();
        for (var i = 0; i < array.length - 1; i++) {
          //Si el monito esta mas abajo se borra
          if (posicionMonito[1] > array[i][1]) {
            aux.splice(1, 1);
           // console.log(posicionMonito[1] + "ES MENOR" + array[i][1]);
           // var a = posicionMonito[0];
           // console.log("algo " + a);
            i = 0;
          }
        }
        return aux;
      }
      marker_monito.getElement().addEventListener("click", () => {
        
        var posi =
          "[" +
          marker_monito.getLngLat().lng +
          ", " +
          marker_monito.getLngLat().lat +
          "]";
          marker_monito.getPopup().setText("" + posi);
      });
function calcularRuta(ruta_da, ruta_ia, ruta_dn, ruta_db) {
        
        var posicionActual = marker_monito.getLngLat().toArray();
        //IZQUIERDA ARRIBA
        var rutaDA = ruta_da
        //DERECHA ARRIBA
        var rutaIA = ruta_ia
        //IZQUIERDA BAJO
        var rutaIB = ruta_dn
        //DERECHA BAJO
        var rutaDB = ruta_db
        //Si esta mas a la izquierda menor es el 71
        
        //"CENTRO DEL MAPA "[-71.2301832257236, -35.00255117047007]
        if (posicionActual[0] < -71.2301832257236) {
          console.log(posicionActual[0]+ " < " + -71.2301832257236)
          //IZQUIERDA ARRIBA O ABAJO
          if (posicionActual[1] > -35.00255117047007) {
            rutaDA = ajustarRutaARRIBA(rutaDA);
          } else {
            //LAS DE ABAJO NO SE AJUSTAN
            rutaDA = ajustarRutaABAJO(rutaIB);
          }
        } else {
          
          //console.log(posi2[0] + " > " + rutaDA[1][0]);
            
          //DERECHA ARRIBA O ABAJO
          if (posicionActual[1] > -35.00255117047007) {
            
            console.log(posicionActual[1]+ " > " + -35.00255117047007)
              rutaDA = ajustarRutaARRIBA(rutaIA);
            
         
          } else {
            //LAS DE ABAJO NO SE AJUSTAN
             rutaDA = ajustarRutaABAJO(rutaDB);
          }
        }
        return rutaDA
       
}
/* function calcularRuta(ruta_da, ruta_ia, ruta_dn) {
        
        var posicionActual = marker_monito.getLngLat().toArray();
        //DERECHA ARRIBA
        var rutaDA = ruta_da
        //IZQUIERDA ARRIBA
        var rutaIA = ruta_ia
        //DERECHA BAJO
        var rutaDB = ruta_dn
        //Si esta mas a la izquierda menor es el 71
        if (posicionActual[0] < rutaDA[1][0]) {
          //console.log(posi2[0]+ " < " +rutaCACA[1][0])
          //DERECHA ARRIBA O ABAJO
          if (posicionActual[1] > -35.00241952772635) {
            rutaDA = ajustarRuta(rutaDA);
          } else {
            rutaDA = rutaDB;
          }
        } else {
          //console.log(posi2[0] + " > " + rutaDA[1][0]);
          rutaDA = ajustarRuta(rutaIA);
        }
        return rutaDA
       
} */
      marker_monito.on("dragstart", (e) => {
        console.log("event type:", e.type);

         if(map.getSource("ruta")!==undefined){
          map.removeLayer("ruta")
          map.removeSource("ruta")
        }
      });

      //Gimnasio (Está separado de los demas porque tiene la linea)
      var coordenada = [-71.23020173932005, -35.00298450172138];
      var coordenada1 = coordenada;
      var gimnasio = agregarMarker(
        "https://img.icons8.com/ios-filled/344/4a90e2/gum-.png",
        coordenada
      );

      gimnasio.getElement().addEventListener("click", () => {
        gimnasio = agregarMarker2(coordenada1);
        muestrate.value = !muestrate.value;
        palabra.value = "Gimnasio";
        urlFoto.value = "https://i.ibb.co/RBtgwP3/gimnacio.png";
        descripcion.value = "Solo se imparten cursos deportivos";
        salasEdificio.value = ["Cancha"];
 //IZQUIERDA ARRIBA
       
        var posicionMonito = marker_monito.getLngLat().toArray();
        var rutaIA = [
          posicionMonito,
          [-71.23115973050183, -35.00176534945205],
          
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
        //DERECHA ARRIBA
        var rutaDA = [
          posicionMonito,
          [-71.22956377876237, -35.00169995273425],
          [-71.22952891004485, -35.00177685089545],
          [-71.22960023329604, -35.00230147403637],
          [-71.22962010515259, -35.00249529593951],
          [-71.2299542258907, -35.002742077997155],
          [-71.22993314064648, -35.00285230588381],
          [-71.23001279480857, -35.00292253568179],
        ];
        //IZQUIERDA BAJO
        var rutaIB = [
          posicionMonito,
          [-71.23102747443811, -35.00329176842333],
          [-71.23097333409589, -35.00267933397523],
          [-71.2308924163537, -35.002425253486656],
          [-71.23041365304353, -35.0024031594937],
          [-71.23008998207365, -35.00267933397523],
          [-71.22989443086256, -35.002845038216385],
          [-71.23001279480857, -35.00292253568179],
        ];
        //DERECHA BAJO
        var rutaDB = [
          posicionMonito,
         [-71.22992919697471, -35.00416267978806],
          [-71.22985502237773, -35.00320712943804],
           [-71.22974713205409, -35.00289781595132],
          [-71.2299542258907, -35.002742077997155],
          [-71.22993314064648, -35.00285230588381],
          [-71.23001279480857, -35.00292253568179],
        ];
       crearRuta(calcularRuta(rutaIA, rutaDA, rutaIB, rutaDB))

       
        
      });

      //PROBANDO NUEVOS EVENTOS
/*       gimnasio.getElement().addEventListener("mouseover", () => {
        gimnasio.getElement().style.width = "40px";
        gimnasio.getElement().style.height = "40px";
        crearRuta(rutaGim);
      }); */
/*       gimnasio.getElement().addEventListener("mouseleave", () => {
        gimnasio.getElement().style.width = "30px";
        gimnasio.getElement().style.height = "30px";
        map.removeLayer("ruta");
        map.removeSource("ruta");
      }); */
      //Evento de pasar el mouse por encima ANTIGUO
      /*       gimnasio.getElement().addEventListener("mouseover", () => {
        gimnasio.getElement().style.width = "40px";
        gimnasio.getElement().style.height = "40px";
        crearRuta(rutaGim);
      }); */
      //Evento de quitar el mouse de encima ANTIGUO
      /*       gimnasio.getElement().addEventListener("mouseleave", () => {
        gimnasio.getElement().style.width = "30px";
        gimnasio.getElement().style.height = "30px";
        map.removeLayer("gimnasio");
        map.removeSource("gimnasio");
      }); */

      //Crea todos los edificios, la cree para podere minimizar el codigo de abajo :9
      crearMarkersEdificios();

      //Creación de Markers
      function crearMarkersEdificios() {
        //ENTRADA
        var coordenada = [-71.229743, -35.001366];
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
            //IZQUIERDA ARRIBA
            var rutaIA = [
            [-71.23113418845851, -35.001824130329624],
            [-71.2305392779135, -35.00187384215659],
            [-71.23047858960702, -35.001680518214926],
            [-71.23074831541507, -35.00161423561504] ,
            [-71.23096099413456, -35.001385863025575],
            ];
            //DERECHA ARRIBA
            var rutaDA = [
            [-71.23006405987928, -35.001655026761895],
            [-71.23011252094012, -35.001689390035295],
            [-71.23048357646839, -35.001689390035295],
            [-71.2307280365811, -35.00163575273211],
            [-71.23096099413456, -35.001385863025575],
            ];
            //IZQUIERDA BAJO
            var rutaIB = [
              
            [-71.23087839459548, -35.0023294726871],
            [-71.23063564136778, -35.002064344069076],
            [-71.23056820991606, -35.001810261670656],
            [-71.23052100789945, -35.00167769662736],
            [-71.23075701798192, -35.00159484336668],
            [-71.23096099413456, -35.001385863025575],
            ];

            //DERECHA ABAJO
              var rutaDB = [
                [-71.22979575263739, -35.00329554704273],
                [-71.229861765523, -35.00273211181711],
            [-71.22963595549773, -35.002479620229956],
            [-71.22962246920727, -35.002264203688284],
            [-71.2299393970325, -35.002225539121135],
            [-71.22995288332295, -35.00191069839103],
            [-71.23004054421037, -35.00168975680498],
            [-71.2304653623587, -35.001695280352386],
            [-71.23077554703869, -35.00163452131504],
            [-71.23096099413456, -35.001385863025575],
            ];


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
          rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //MECANICA
        coordenada = [-71.22886378003142, -35.002003009634954];
        var coordenada4 = coordenada;
            //IZQUIERDA ARRIBA
            rutaIA = [
              [-71.23159814685079, -35.00170956246478],
              [-71.23068933519244, -35.001803455665595],
              [-71.23009119448706, -35.001666230712814],
            [-71.22994045375468, -35.001772899284376],
            [-71.22989999488328, -35.00189441710756],
            [-71.22975838883404, -35.00183365821896],
            [-71.2295291218968, -35.00186679943677],
            [-71.22954935133251, -35.00199936417275],
            [-71.22925350118679, -35.00201815616897],
            ];
            //DERECHA ARRIBA
            rutaDA = [
            [-71.22951786511686, -35.001649503211766],
            
           
            [-71.22953540020359, -35.0018514453741],
            [-71.22952865705835, -35.00197848660797],
            [-71.22914217874192, -35.00211292536106],
            ];
            //IZQUIERDA BAJO
            rutaIB = [
              [-71.23164195585917, -35.00400802499605],
              [-71.23145930246878, -35.00332844838329],
            [-71.23133851432371, -35.002654783105875],
            [-71.23071140181906, -35.00233442052446],
            [-71.23055577783353, -35.00223526685119],
            [-71.23026489286617, -35.00238030216184],
            [-71.22996366701813, -35.00222097827062],
            [-71.22959671516207, -35.00228648953184],
            [-71.22919419414696, -35.00236203803743],
            [-71.22912676269468, -35.00213005063611],
            ];

            //DERECHA ABAJO
            rutaDB = [
              [-71.22997639899131, -35.00386994011496],
              [-71.22987370635622, -35.00344845505806],
              [-71.22984153608728, -35.0032347466573],
            [-71.22963595549773, -35.002479620229956],
            [-71.22962246920727, -35.002264203688284],
        
            [-71.22952460826205, -35.00200300963754],
            [-71.22930882761528, -35.00203615078671],
            ];

        var mecanica = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/robot--v1.png",
          coordenada
        );
        agregarEventoClick(
          mecanica,
          coordenada4,
          "Edificio de Mecánica",
          "https://i.ibb.co/7tSm92s/mecanica.png",
          "Incluye a Mecatrónica",
          true,
          rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //CONSTRUCCION
        coordenada = [-71.2291604784214, -35.003168465316016];

            //IZQUIERDA ARRIBA
            rutaIA = [
            [-71.23134832523719, -35.00126026641036],
            [-71.23159814685079, -35.00170956246478],
            [-71.23068933519244, -35.001803455665595],
            [-71.23061665333019, -35.002059089421],
            [-71.23040796028485, -35.00236756153946],
            [-71.23026635423507, -35.00251669594019],
            
            [-71.23017834889141, -35.00262801022813],
            [-71.2298479347763, -35.0027108624426],
            [-71.229825276637, -35.00283074648609],
            [-71.22968609929134, -35.00289866048582],
            [-71.22930848315963, -35.00294837165996],
            [-71.22930848315963, -35.00315273950433],
            [-71.22905224364146, -35.0031582629521],
            ];
            //DERECHA ARRIBA
            rutaDA = [
           [-71.22951078957803, -35.00158212650018],        
            [-71.22952956504052, -35.00178764703294],
            [-71.22959125584781, -35.0022819905632],
            [-71.2295880356769, -35.002478236736245],
            [-71.22950532752354, -35.00264139908957],
            [-71.22943813788862, -35.00283110384362],
            [-71.22930966067473, -35.003044350467384],
            [-71.22930627969569, -35.003116355696044],
            [-71.22922851717178, -35.0031274334178],
            ];
            //IZQUIERDA BAJO
            rutaIB = [
              [-71.23164195585917, -35.00400802499605],
              [-71.23145930246878, -35.00332844838329],
            [-71.23133851432371, -35.002654783105875],
            [-71.23071140181906, -35.00233442052446],
            [-71.23010451875011, -35.00271001790707],
            [-71.22957181027867, -35.00287019861922],
            [-71.22929534132484, -35.00298066789257],
            [-71.22930208447005, -35.003085613565425],
            [-71.2292279098731, -35.003085613565425],
            ];

            //DERECHA ABAJO
            rutaDB = [
             [-71.22996239628229, -35.00421068601842],
              [-71.22992868055617, -35.00362520596916],
              [-71.2297870745069, -35.00315019077461],
           [-71.2296454684571, -35.002901635213234],
            [-71.22926785232536, -35.002956869847786],
        
            [-71.22932179748719, -35.003111526626135],
            [-71.22926785232536, -35.00317780801309],
            ];

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
          rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //AUDITORIO
        coordenada = [-71.22915475374442, -35.00365484351161];

        
            //IZQUIERDA ARRIBA
            rutaIA = [
              [-71.23134832523719, -35.00126026641036],
            [-71.23159814685079, -35.00170956246478],
            [-71.23068933519244, -35.001803455665595],
            [-71.23061665333019, -35.002059089421],
            [-71.23040796028485, -35.00236756153946],
            [-71.23026635423507, -35.00251669594019],
            
            [-71.23017834889141, -35.00262801022813],
            [-71.2298479347763, -35.0027108624426],
            [-71.229825276637, -35.00283074648609],
            [-71.22968609929134, -35.00289866048582],
            [-71.22930848315963, -35.00294837165996],
            [-71.22930848315963, -35.00315273950433],
            [-71.2293711281972, -35.00340111009602],
            [-71.22931438594055, -35.003499392821766],
            ];
            //DERECHA ARRIBA
            rutaDA = [
           [-71.22951078957803, -35.00158212650018],        
            [-71.22952956504052, -35.00178764703294],
            [-71.22959125584781, -35.0022819905632],
            [-71.2295880356769, -35.002478236736245],
            [-71.22950532752354, -35.00264139908957],
            [-71.22943813788862, -35.00283110384362],
            [-71.22930966067473, -35.003044350467384],
            [-71.22930627969569, -35.003116355696044],
            [-71.22936215451628, -35.00343852746166],
            [-71.22928305856374, -35.00349448148273],
            ];
            //IZQUIERDA BAJO
            rutaIB = [
              [-71.23164195585917, -35.00400802499605],
              [-71.23145930246878, -35.00332844838329],
            [-71.23133851432371, -35.002654783105875],
            [-71.23071140181906, -35.00233442052446],
            [-71.23010451875011, -35.00271001790707],
            [-71.22957181027867, -35.00287019861922],
            [-71.22929534132484, -35.00298066789257],
            [-71.22930208447005, -35.003085613565425],
            [-71.22936544460389, -35.00344596102871],
            [-71.22929570716889, -35.00350967529374],
            ];

            //DERECHA ABAJO
            rutaDB = [
             [-71.22996239628229, -35.00421068601842],
              [-71.22992868055617, -35.00362520596916],
              [-71.2297870745069, -35.00315019077461],
           [-71.2296454684571, -35.002901635213234],
            [-71.22926785232536, -35.002956869847786],
            [-71.22935935282999, -35.00341776875251],
            [-71.22926559337259, -35.00351551420426],
        
            ];
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
             rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //EDIFICIO AZUL
        coordenada = [-71.22979433407157, -35.0017047386893];
                
            //IZQUIERDA ARRIBA
            rutaIA = [
            [-71.23134832523719, -35.00126026641036],
            [-71.23159814685079, -35.00170956246478],
            [-71.23068933519244, -35.001803455665595],
            [-71.23051660178233, -35.001788207148756],
            [-71.23032105057122, -35.00181030130769],
            [-71.22996366387518, -35.00160593011016],
            [-71.22983554411584, -35.0016556420706],
            ];
            //DERECHA ARRIBA
            rutaDA = [
           [-71.22936352395149, -35.00162250076733],
           [-71.22963999290477, -35.00157831234202],
           [-71.22992994814905, -35.001567265231984],
           [-71.22983554411584, -35.00169430690708],
            ];
            //IZQUIERDA BAJO
            rutaIB = [
              [-71.23164195585917, -35.00400802499605],
              [-71.23145930246878, -35.00332844838329],
            [-71.23133851432371, -35.002654783105875],
              [-71.2305563094797, -35.00219633281465],
              [-71.23049562117264, -35.00193672729537],
              [-71.23007080302487, -35.00168816804853],
              [-71.22994268326552, -35.00158322058328],
              [-71.22979433407103, -35.001638456107855],
            ];

            //DERECHA ABAJO
            rutaDB = [
             [-71.22996239628229, -35.00421068601842],
              [-71.22992868055617, -35.00362520596916],
              [-71.2297870745069, -35.00315019077461],
           [-71.22954558887211, -35.00272168016354],
           [-71.22966696548566, -35.00265539840707],
           [-71.2296265066143, -35.00228532428137],
           [-71.22955907516256, -35.00184344253497],
           [-71.2296062771786, -35.001567265231984],
           [-71.22992320500381, -35.0015562181204],
           [-71.22987600298721, -35.00163354786992],
        
            ];
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
          rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //EDIFICIO VERDE
        coordenada = [-71.22999896811982, -35.002471304966534];
                    //IZQUIERDA ARRIBA
            rutaIA = [
            [-71.23134832523719, -35.00126026641036],
            [-71.23159814685079, -35.00170956246478],
            [-71.23054956633412, -35.00187044490652],
            [-71.23055630947935, -35.00221290335481],
            [-71.23029332681597, -35.00237860854144],
            [-71.23011800504055, -35.0022681384543],
            [-71.23001011471746, -35.002339944027455],
            ];
            //DERECHA ARRIBA
            rutaDA = [
           [-71.22946391995558, -35.00162188545834],
           [-71.22951786511686, -35.00182625661602],
           [-71.22985502237773, -35.00183178015332],
           [-71.22997831277658, -35.00220043250775],
           [-71.23011126189533, -35.002240520909666],
           [-71.23001685786268, -35.00229575599054]
            ];
            //IZQUIERDA BAJO
            rutaIB = [
              [-71.23164195585917, -35.00400802499605],
              [-71.23145930246878, -35.00332844838329],
            [-71.23133851432371, -35.002654783105875],
           [-71.23031355625166, -35.00242279653453],
           [-71.23009103245967, -35.0022570914374],
           [-71.23001685786268, -35.00233442052446]
            ];

            //DERECHA ABAJO
            rutaDB = [
             [-71.22996239628229, -35.00421068601842],
              [-71.22992868055617, -35.00362520596916],
              [-71.2297870745069, -35.00315019077461],
           [-71.22954558887211, -35.00272168016354],
           [-71.22962405967101, -35.00225112671869],
           [-71.22994098749565, -35.00222903267876],
           [-71.22998818951227, -35.002168274038645],
           [-71.23012305241629, -35.00225112671869],
           [-71.23000167580271, -35.00233397931475],
        
            ];

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
           rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //Bienestar Estudiantil
        coordenada = [-71.22980662330485, -35.0020445830408];
          //IZQUIERDA ARRIBA
            rutaIA = [
            [-71.23134832523719, -35.00126026641036],
            [-71.23159814685079, -35.00170956246478],
            [-71.23054956633412, -35.00187044490652],
            [-71.23055630947935, -35.00221290335481],
            [-71.23029332681597, -35.00237860854144],
            [-71.23011800504055, -35.0022681384543],
            [-71.22997711867006, -35.00220476038778],
            [-71.22989128798135, -35.00213225678731],
            ];
            //DERECHA ARRIBA
            rutaDA = [
           [-71.22946391995558, -35.00162188545834],
           [-71.22951786511686, -35.00182625661602],
           [-71.22985502237773, -35.00183178015332],
           [-71.22997831277658, -35.00220043250775],
           [-71.22988285457285, -35.00211567459168],
            ];
            //IZQUIERDA BAJO
            rutaIB = [
              [-71.23164195585917, -35.00400802499605],
              [-71.23145930246878, -35.00332844838329],
            [-71.23133851432371, -35.002654783105875],
           [-71.23031355625166, -35.00242279653453],
           [-71.23009103245967, -35.0022570914374],
           [-71.22994921338174, -35.002197465408976],
           [-71.22989182975493, -35.00211274325847],
            ];

            //DERECHA ABAJO
            rutaDB = [

       [-71.22996239628229, -35.00421068601842],

[-71.22992868055617, -35.00362520596916],
              [-71.2297870745069, -35.00315019077461],
           [-71.22954558887211, -35.00272168016354],
           [-71.22962405967101, -35.00225112671869],
           [-71.22994098749565, -35.00222903267876],
           [-71.22998818951227, -35.002168274038645],
           [-71.2298523707951, -35.002078082418066],
        
            ];
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
          rutaIA,
          rutaDA,
          rutaIB,
          rutaDB
        );

        //Biblioteca
        coordenada = [-71.22892109676758, -35.00283153433725];
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
          true
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

        //CABAÑA MADERA
        coordenada = [-71.22897841350172, -35.002423278615076];
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
          true
        );

        //SERVICIOS MULTIPLES
        coordenada = [-71.2302405610473, -35.00213003797558];
        var coordenada13 = coordenada;
        var multiples = agregarMarker(
          "https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png",
          coordenada
        );
        agregarEventoClick(
          multiples,
          coordenada13,
          "Servicios Múltiples",
          "https://i.ibb.co/7C8VYBR/multiples.png",
          "",
          true
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
          true
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
            "line-color": "#FFFF00",
            "line-width": 4,
          },
        });
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
          marker.getElement().style.transition = "0.2s";
          marker.getElement().style.borderRadius = "50%";
          marker.getElement().style.border = "2px solid #313C75";
        });
        //Evento de quitar el mouse de encima
        marker.getElement().addEventListener("mouseleave", () => {
          marker.getElement().style.width = "30px";
          marker.getElement().style.height = "30px";
          marker.getElement().style.backgroundColor = "transparent";
          marker.getElement().style.border = "none";
        });

        return marker;
      }

      function agregarMarker2(coordenada) {
        //Elemento
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage =
          `url(` + "https://img.icons8.com/fluency/344/marker-a.png" + `)`;
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

      function agregarEventoClick(
        marker,
        e_coordenada,
        e_palabra,
        e_url,
        e_descripcion,
        e_salas,
        e_rutaDA,
        e_rutaIA,
        e_rutaIB,
        e_rutaDB,
      ) {
        marker.getElement().addEventListener("click", () => {
          marker = agregarMarker2(e_coordenada);
          muestrate.value = !muestrate.value;
          palabra.value = e_palabra;
          urlFoto.value = e_url;
          descripcion.value = e_descripcion;
          //Tiene salas o no
          if (e_salas == false) {
            salasEdificio.value = ["---"];
          } else {
            API.getSalasByName(palabra.value);
            salasEdificio.value = API.getSalas();
          }


        var posicionMonito2 = marker_monito.getLngLat().toArray();
        var rutaDA = [
          posicionMonito2,
        ];
          var rutaIA = [
          posicionMonito2,
        ];
        var rutaIB = [
          posicionMonito2,
        ];
        var rutaDB = [
          posicionMonito2,
        ];
          e_rutaDA.forEach(element => {
            rutaDA.push(element)
          });
          e_rutaIA.forEach(element => {
            rutaIA.push(element)
          });
          e_rutaIB.forEach(element => {
            rutaIB.push(element)
          });
          e_rutaDB.forEach(element => {
            rutaDB.push(element)
          });
          crearRuta(calcularRuta(rutaDA, rutaIA, rutaIB, rutaDB))
         

        });
      }
    });
    return {
      muestrate,
      palabra,
      urlFoto,
      descripcion,
      salasEdificio,
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