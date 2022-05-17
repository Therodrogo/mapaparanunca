 <template>

    <div class="container">
        <div class="editarEdificios" >
            
            <div v-for="(item, index) in cursosActivos" :key="item.id">
                <div @click="botonIr(index)" v-if="mostrarCursos" class="infoCursos">
                    
                     <!-- {{index }} : {{ item.nombre }} - Sección {{ item.seccion }} -->
                   {{index }} : {{ item.nombre }}
                       
                    
                </div>              
            </div>
        
            
            <div>
                <div v-if="mostrarEditarCrusos" class="infoCursoSeleccionado">

                   
                    <v-list-item>
                        <v-list-item-content >
                            <div v-if="mostrarSecciones">
                             <button @click="m_mostrarCursos()"><ion-icon name="md-arrow-round-back"></ion-icon></button>
                              
                                    <div  class="d-flex justify-center">
                                        {{cursosActivos[indexCursoSeleccionado].nombre }}
                                        
                                    </div>
                                    <div  v-for="(item) in secciones" :key="item.id"  class="d-flex justify-center"> 
                                    
                                            <div @click="m_mostrarBloques(item)"  class="infoCursos">
                                            Sección  {{ item}}  
                                            </div> 
                                    
                                    </div>
                               
                            </div>

                            <div v-if="mostrarBloques" class="infoCursoSeleccionado">
                                
                                <button @click="volverASecciones()"><ion-icon name="md-arrow-round-back"></ion-icon>
                                </button>
                                       
                             
                                        <v-list-item>
                                            <v-list-item-content >
                                            <div class="d-flex justify-center"> 
                                                {{cursosActivos[indexCursoSeleccionado].nombre }} -  Sección {{ seccionSeleccionada }}
                                                
                                            </div>
                                            </v-list-item-content>
                                        </v-list-item>
                                         <v-list-item>
                                            <v-list-item-content >
                                                <div  v-for="(item,index) in bloques" :key="item.id"  class="d-flex justify-center"> 
                                    
                                                    <div @click="m_mostrarEditarBloque(item,index)"  class="infoCursos">
                                                        Bloque {{item.hora_inicio}} - {{item.hora_final}}
                                                    </div> 
                                    
                                                </div>  
                                            </v-list-item-content>
                                        </v-list-item>
                                       
                            </div>  
                            <div v-if="mostrarEditarBloque" class="infoCursoSeleccionado">
                                
                                <button @click="volverABloques()"><ion-icon name="md-arrow-round-back"></ion-icon>
                                </button>
                                       
                             
                                      <div class="formularioEditar">
                                            <v-list-item>
                                            <v-list-item-content class="justify-center">
                                                <v-list-item-title  class="formularioEditar"> Hora_Inicio Actual: {{ hora_iniActual}}  </v-list-item-title>
                                                
                                            </v-list-item-content>
                                            </v-list-item>
                                            <v-select             
                                                    v-model="hora_ini_nueva"
                                                    autowidth
                                                    :items="horasDeInicio"
                                                    label="Seleccionar Hora"
                                                    outlined
                                                    dense
                                                    
                                            >
                                            </v-select>
                                            
                                            
                                    
                                            
                                        
                                            <v-list-item>
                                                <v-list-item-content class="justify-center">
                                                    <v-list-item-title  class="formularioEditar">Hora_Final Actual: {{ hora_finActual}} </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-select 
                                                    
                                                    v-model="hora_fin_nueva"
                                                    autowidth
                                                    :items="horasDeTermino"
                                                    label="Seleccionar Hora"
                                                    outlined
                                                    dense

                                                    
                                            >
                                            </v-select>
                                            <v-list-item>
                                                <v-list-item-content class="justify-center">
                                                    <v-list-item-title  class="formularioEditar">Sala Actual: {{ sala_Actual}}   </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-select 
                                                
                                                    
                                                    autowidth
                                                    v-model="sala_nueva"
                                                    :items="salas"
                                                    label="Seleccionar Sala"
                                                    outlined
                                                    dense
                                                    
                                            >
                                            </v-select>
                                             <v-list-item>
                                                <v-list-item-content class="justify-center">
                                                    <v-list-item-title  class="formularioEditar">Dia  Actual: {{dia_Actual}}   </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-select 
                                
                                                    autowidth
                                                    v-model="dia_nueva"
                                                    :items="dias"
                                                    label="Seleccionar Dia"
                                                    outlined
                                                    dense
                                                    
                                            >
                                            </v-select>
                                            <v-list-item class="justify-center">
                                                <v-list-item-content>
                                                        <button class="botonGuardar" @click="guardarSala()">Guardar</button>
                                                        
                                                </v-list-item-content>
                                            </v-list-item>
                                    
                                
                                        
                                        </div>   
                                       
                            </div>  
                                
                            
                        </v-list-item-content>  
                    </v-list-item>
                   
                        
                </div>      
                
               
            
            </div>
        </div>
    </div>
</template>

<script>
import API from "@/api";
import  {ref } from "vue";
import swal from "sweetalert";
var idCursoSeleccionado = ref();
export default {

    data(){
        return{
                instanciaSalaslala:[],
            seccionNoSeleccionada:true,
            


            mostrarCursos: true,
            mostrarEditarCrusos: false,
            mostrarSecciones:false,
            mostrarBloques:false,
            mostrarEditarBloque:false,

            indexCursoSeleccionado:0,
            indexBloqueSeleccionado:0,
            seccionSeleccionada:"",
            bloqueSeleccionado:"",
            hora_iniActual:"",
            hora_finActual:"",
            sala_Actual:"",
            dia_Actual:"",

            hora_ini_nueva:"",
            hora_fin_nueva:"",
            sala_nueva:"",
            dia_nueva:"",
            cursos:[ ],
            cursosActivos: [ ],
            cursosInstacias: [ ],
            cursoEditado:[ ],
            horasDeInicio:[
                "8:30",
                "9:40",
                "10:50",
                "12:00",
                "13:10",
                "14:20",
                "15:30",
                "16:40",
                "17:50",
                "19:00",
                "20:10",
                "21:20",
            ],
            horasDeTermino:[
                "9:30",
                "10:40",
                "11:50",
                "13:00",
                "14:10",
                "15:20",
                "16:30",
                "17:40",
                "18:50",
                "20:00",
                "21:10",
                "22:20",
            ],
            salas:[],
            secciones:[],
            bloques:[],
            dias:[

                "Lunes",
                "Martes",
                "Miercoles",
                "Jueves",
                "Viernes",
                "Sabado",
                "Domingo",

            ]
        }
    },methods: {
        async getEdificios(){
            
          
    
            //Para sacar los cursos activos
             this.cursos = await API.getAllCursos() 
             this.cursos.forEach(element => {
                //console.log(element.nombre)
                this.cursosActivos.push({
                   nombre: element.nombre,
                   }
                );
      
            });
            this.secciones.forEach(element => {
               // console.log(element.nombre)
                this.cursosActivos.push({
                   nombre: element.nombre,
                   asiste: element.asisteID,
                   }
                );
      
            });
            var instanciaSalas = await API.getAllSalas();
             instanciaSalas.forEach(element => {
               // console.log(element.nombre)
                this.salas.push(
                    element.nombre,
                   
                );
      
            });
            
          //  console.log(this.cursos, instanciaSalas)
        },
        m_mostrarCursos(){
            this.mostrarCursos=true;
            this.mostrarEditarCrusos=false;
            this.mostrarSecciones=false;
            this.mostrarBloques=false;
            this.mostrarEditarBloque=false;
            this.indexCursoSeleccionado=0;
            this.secciones=[];
        },
         m_mostrarBloques(seccionSL){
            this.mostrarBloques=true;
            this.mostrarSecciones=false;
            console.log("SELECCION SELECICONADA " +seccionSL)
            this.seccionSeleccionada=seccionSL;
        },
        m_mostrarEditarBloque(item, index){
            this.mostrarBloques=false;
            this.mostrarEditarBloque=true;
            this.hora_iniActual=item.hora_inicio;
            this.hora_finActual=item.hora_final;
            //console.log(item.id_sala.nombre)
            this.sala_Actual=item.id_sala.nombre;
            this.dia_Actual=item.dia;
            //item es el curso editado
            this.cursoEditado=item;
            this.indexBloqueSeleccionado=index;

            
            //console.log("Salas " + this.salas)

            /* Sala = this.cursos[cursoSeleccionado].id_sala.nombre*/ 
        },
        volverASecciones(){
            this.mostrarBloques=false;
            this.mostrarSecciones=true;
        },
        volverABloques(){
            this.mostrarBloques=true;
            this.mostrarEditarBloque=false;
        },
        botonIr(cursoSeleccionado){
            //Guardamos el curso seleccionado
            this.indexCursoSeleccionado=cursoSeleccionado;

            //Ocultar Cursos
            this.mostrarCursos=false;

            //Mostrar EditarCursos
            this.mostrarEditarCrusos=true;

            //Mostrar Secciones
            this.mostrarSecciones=true;

            //OCULTAR O ABRIR LA VENTANA DE LOS CURSOS
            this.cursoNoSeleccionado=!this.cursoNoSeleccionado;
            this.cursoSeleccionado=!this.cursoSeleccionado;
            //GUARDAR EL ID DEL CURSO QUE SELECCIONO
            idCursoSeleccionado.value=cursoSeleccionado;
    
            //this.idCursoSeleccionado=cursoSeleccionado;
            //console.log("id CURSO SELECCIONADO: " +idCursoSeleccionado.value);
           // console.log(this.cursos[cursoSeleccionado].asisteID);
            //console.log("Se agregó " +(this.cursos[cursoSeleccionado].asisteID[0].seccion));
            //console.log("lalala "+this.cursos[cursoSeleccionado].asisteID[cursoSeleccionado].seccion);
            var instaciaCorresponde = this.cursos[cursoSeleccionado].asisteID;
            var instanciaSecciones=[];
            //SECCIONES
            instaciaCorresponde.forEach(element => {
                console.log("Se agregó " +element.seccion);
                instanciaSecciones.push(
                   element.seccion,
                 
                   
                );
      
            });
            instanciaSecciones= [...new Set( instanciaSecciones)];
            console.log(instanciaSecciones);
            this.secciones=instanciaSecciones;

            //BLOQUES
            this.bloques= this.cursos[cursoSeleccionado].asisteID;
            //this.bloques= [...new Set( this.bloques)];
            //console.log("aaa " +this.bloques);
            // //QUITAMOS DUPLICADOS EN LAS SECCIONES
            //this.cursosInstacias= [...new Set(this.cursosInstacias)];
            //console.log(this.cursosInstacias);

       
         
            
            //Guardamos los valores antiguos de las salas
            this.hora_ini_nueva=this.cursos[cursoSeleccionado].hora_inicio;
            this.hora_fin_nueva= this.cursos[cursoSeleccionado].hora_final;
            this.sala_nueva= this.cursos[cursoSeleccionado].id_sala.nombre;
        },
        botonVolver(){
            this.cursoNoSeleccionado=!this.cursoNoSeleccionado;
            this.cursoSeleccionado=!this.cursoSeleccionado;
            this.seccionNoSeleccionada=!this.seccionNoSeleccionada;
            console.log("SECCION NO SELECCIONADA: " + this.seccionNoSeleccionada);
            this.seccionSeleccionada=!this.seccionSeleccionada;
             console.log("SECCION  SELECCIONADA: " + this.seccionSeleccionada);

         
           
        },
        
        guardarSala(){
            swal("Listo", "Sala Editada.", "success");
            this.m_mostrarCursos()
            if (this.hora_fin_nueva!=null) {
                this.bloques[this.indexBloqueSeleccionado].hora_final= this.hora_fin_nueva;
                this.hora_finActual=this.hora_fin_nueva;
                 
            }else{
                this.hora_fin_nueva=this.hora_finActual;
            }
            if (this.hora_ini_nueva!=null) {
                this.bloques[this.indexBloqueSeleccionado].hora_inicio= this.hora_ini_nueva;
                this.hora_iniActual=this.hora_ini_nueva;
            }else{
                this.hora_ini_nueva=this.hora_iniActual;
            }
            if (this.dia_nueva!="") {
                this.bloques[this.indexBloqueSeleccionado].dia= this.dia_nueva;
                this.dia_Actual=this.bloques[this.indexBloqueSeleccionado].dia;
            }else{
                this.dia_nueva=this.dia_Actual;
            }
            if (this.sala_nueva!="") {
                this.bloques[this.indexBloqueSeleccionado].id_sala.nombre=this.sala_nueva;
                this.sala_Actual=this.sala_nueva;
            }else{
                this.sala_nueva=this.bloques[this.indexBloqueSeleccionado].id_sala.nombre;
            }
            //COSAS PAL PABLO
            console.log("ID del assite: "+this.bloques[this.indexBloqueSeleccionado]._id)
            console.log("nueva hora ini del assite: "+this.hora_ini_nueva);
            console.log("nueva hora fin del assite: "+this.hora_fin_nueva);
            console.log("nueva sala del assite: "+this.sala_nueva);
            console.log("nuevo dia del assite: "+this.dia_nueva);
           
            
            
            /* Hora_Inicio =  this.cursoEditado.hora_inicio=this.hora_ini_nueva;*/
            /* Hora_Final =  this.cursos[this.indexCursoSeleccionado].hora_final=this.hora_fin_nueva;*/
            /* Sala = this.cursos[this.indexCursoSeleccionado].id_sala.nombre=this.sala_nueva; */
        },

    },beforeMount() {
        this.getEdificios()
       
    },

}
</script> 

<style scoped>

.container{
    float: right;
    margin: 10px 0 0 0;
    width: 400px;
    max-height: 600px;
    color: rgb(255, 255, 255);
    transition: 0.5s;
    border-radius: 2%;
    overflow-y: auto;

}
.editarEdificios{
    color: aliceblue;
    height: 600px;
    z-index: 90;
    transition: 0.5s;
    overflow-y: auto;
    transition: 0.5s;
    background: rgba(255, 255, 255, 0.292);
    border-radius: 2%;
    overflow-x: hidden;
}
.infoCursos{
    color: aliceblue;
    background: #313C75;
    padding: 10px;
    border-top: 1px solid #ffffff;
    cursor: pointer;
    border-radius: 2%;
    
    transition: 0.5s;
}
.infoCursos:hover{
    background: #5163bb;
    
}
.infoCursoSeleccionado{
    
    color: aliceblue;
    background: #313C75;
    width: 400px;
    font-size: 25px;
    border-radius: 2%;
    transition: 0.5s;
}
.formularioEditar{
    color: aliceblue;
    background: #313C75;
    width: 320px;
    font-weight: bold;
    transition: 0.5s;
    border-radius: 2%;
}

.infoCursoSeleccionado ion-icon{

    margin: 5px;
    transition: 0.5s;
}
.infoCursoSeleccionado ion-icon:hover{

    background: #677EF5;
    border-radius: 50%;
}
.botonIr{
    position: relative;
    width: 30px;
    height: 60px;
    left: 86%;
    background: #313C75;
    transition: 0.5s;
}
.botonIr:hover{
    background: #677EF5;
}

.v-select{
    width: 350px;
    padding: 0 0 0 25px;
}
.botonGuardar{
    transition: 0.5s;
    margin: 0 0 0 50px;
    padding: 5px;
    

}
.botonGuardar:hover{
    background: #677EF5;
    
    border-radius: 15%;
}

</style>