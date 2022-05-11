 <template>

    <div class="container">
        <div class="editarEdificios" >
            
            <div v-for="(item, index) in cursosActivos" :key="item.id">
                <div @click="botonIr(index)" v-if="cursoNoSeleccionado" class="infoCursos">
                    
                     <!-- {{index }} : {{ item.nombre }} - Sección {{ item.seccion }} -->
                       {{ item.nombre }} - Sección {{ item.seccion }}
                    
                </div>              
            </div>
            <div>
                <div v-if="cursoSeleccionado" class="infoCursoSeleccionado">
                    <button @click="botonIr()"><ion-icon name="md-arrow-round-back"></ion-icon></button>
                
                    <v-list-item>
                        <v-list-item-content >
                        <div class="d-flex justify-center"> {{ cursoEditado[0]}} -  Sección {{ cursoEditado[1]}}</div>
                        </v-list-item-content>
                    </v-list-item>
                    <div class="formularioEditar">
                        <v-list-item>
                        <v-list-item-content class="justify-center">
                            <v-list-item-title  class="formularioEditar"> Hora_Inicio Actual: {{ cursoEditado[2]}}  </v-list-item-title>
                            
                        </v-list-item-content>
                        </v-list-item>
                        <v-select 
                                
                                v-model="hora_ini_nueva"
                                @input="setHoraI"
                                autowidth
                                :items="horasDeInicio"
                                label="Seleccionar Hora"
                                outlined
                                dense
                                
                        >
                        </v-select>
                        
                        
                   
                        
                    
                    <v-list-item>
                        <v-list-item-content class="justify-center">
                            <v-list-item-title  class="formularioEditar">Hora_Final Actual: {{ cursoEditado[3]}} </v-list-item-title>
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
                            <v-list-item-title  class="formularioEditar">Sala Actual: {{ cursoEditado[4]}}   </v-list-item-title>
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
                    <v-list-item class="justify-center">
                        <v-list-item-content>
                                <button class="botonGuardar" @click="guardarSala()">Guardar</button>
                                
                        </v-list-item-content>
                    </v-list-item>
              
                       
                     </div>
                        
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
            hora_ini_nueva:"",
            hora_fin_nueva:"",
            sala_nueva:"",
            cursoNoSeleccionado: true,
            cursoSeleccionado:false,
            indexCursoSeleccionado:0,
            cursos:[ ],
            cursosActivos: [ ],
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
            salas:[]
        }
    },methods: {
        async getEdificios(){
            
            this.cursos = await API.getAllAsistes() 
    
            //NOMBRES DE UN CURSO, SALAS
            this.cursos.forEach(element => {
                this.cursosActivos.push({
                    nombre: element.id_curso.nombre,
                    seccion: element.seccion
                    }
                );
                this.salas.push(element.id_sala.nombre);
                
            });
            
            //console.log(this.cursos[0].id_sala.nombre)
        },
        botonIr(cursoSeleccionado){
            //Guardamos el curso seleccionado
            this.indexCursoSeleccionado=cursoSeleccionado;

            this.cursoNoSeleccionado=!this.cursoNoSeleccionado;
            this.cursoSeleccionado=!this.cursoSeleccionado;
            idCursoSeleccionado.value=cursoSeleccionado;
            //this.idCursoSeleccionado=cursoSeleccionado;
            console.log("id CURSO SELECCIONADO:" +idCursoSeleccionado.value);
            this.cursoEditado=[
                /*Nombre =*/ this.cursos[cursoSeleccionado].id_curso.nombre,
                /*Seccion */  this.cursos[cursoSeleccionado].seccion,
               /* Hora_Inicio = */ this.cursos[cursoSeleccionado].hora_inicio,
               /* Hora_Final = */ this.cursos[cursoSeleccionado].hora_final,
               /* Sala = */ this.cursos[cursoSeleccionado].id_sala.nombre
            ]
            //QUITAMOS DUPLICADOS EN LAS SALAS
            this.salas= [...new Set(this.salas)];
            
            //Guardamos los valores antiguos de las salas
            this.hora_ini_nueva=this.cursos[cursoSeleccionado].hora_inicio;
            this.hora_fin_nueva= this.cursos[cursoSeleccionado].hora_final;
            this.sala_nueva= this.cursos[cursoSeleccionado].id_sala.nombre;
        },
        guardarSala(){
            swal("Listo", "Sala Editada.", "success");
            this.cursoNoSeleccionado= true;
            this.cursoSeleccionado=false;
            console.log(this.hora_ini_nueva);
            console.log(this.hora_fin_nueva);
            console.log(this.sala_nueva);
            /* Hora_Inicio = */ this.cursos[this.indexCursoSeleccionado].hora_inicio=this.hora_ini_nueva;
            /* Hora_Final = */ this.cursos[this.indexCursoSeleccionado].hora_final=this.hora_fin_nueva;
            /* Sala = */ this.cursos[this.indexCursoSeleccionado].id_sala.nombre=this.sala_nueva;
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