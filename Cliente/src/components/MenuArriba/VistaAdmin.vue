<template>

    <div class="container">
        <div class="editarEdificios" >
            
            <div v-for="item in cursos" :key="item.id">
                <div @click="botonIr(index)" v-if="cursoNoSeleccionado" class="infoCursos">
                    
                     <!-- {{index }} : {{ item.nombre }} - Sección {{ item.seccion }} -->
                       {{ item}} 
                    
                </div>              
            </div>
            <div>
                <div v-if="cursoSeleccionado" class="infoCursoSeleccionado">
                    <button @click="botonIr()"><ion-icon name="md-arrow-round-back"></ion-icon></button>
                
                   
                    <div class="formularioEditar">
                                         
                    <v-list-item>
                        <v-list-item-content class="justify-center">
                            <v-list-item-title  class="formularioEditar"> {{ cursoEditado}}   </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                        <v-select 
                            
                                
                                autowidth
                                v-model="sala_nueva"
                                :items="salas"
                                label="Sala(s)"
                                outlined
                                dense
                                
                        >
                        </v-select>
                    <v-list-item class="justify-center">
                        <v-list-item-content>
                                
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
export default {

    data(){
        return{
            
            cursoNoSeleccionado: true,
            cursoSeleccionado:false,
            indexCursoSeleccionado:0,
            cursos:[ ],   
            salas:[]
           
        }
    },methods: {


            async show(cursoSeleccionado){
                
                this.salas= await API.getSalasByName(cursoSeleccionado)
                console.log(this.salas)
        },


        async getEdificios(){
            
            this.cursos = await API.getEdificios() 
           
        },      

        botonIr(cursoSeleccionado){
            //Guardamos el curso seleccionado
            
           
            this.cursoNoSeleccionado=!this.cursoNoSeleccionado;
            this.cursoSeleccionado=!this.cursoSeleccionado;
         
            //this.idCursoSeleccionado=cursoSeleccionado;

            
            this.cursoEditado=[
                /*Nombre =*/ this.cursos[cursoSeleccionado].id_curso.nombre,
                /*Seccion */  this.cursos[cursoSeleccionado].seccion,
               /* Hora_Inicio = */ this.cursos[cursoSeleccionado].hora_inicio,
               /* Hora_Final = */ this.cursos[cursoSeleccionado].hora_final,
               /* Sala = */ this.cursos[this.salas]
            ]
            //QUITAMOS DUPLICADOS EN LAS SALAS
          
            
            //Guardamos los valores antiguos de las salas
           
        },
    },beforeMount() {
        this.getEdificios()
  
       
    },

}
</script>




<style scoped>

.container{
    float: right;
    display: inline-block;
    box-sizing: border-box;
    margin: 10px 0 0 0;
    width: 400px;
    color: rgb(255, 255, 255);
    transition: 0.5s;
}
.editarEdificios{
    position: relative;
    color: aliceblue;
    width: auto;
    max-height: 600px;
    z-index: 90;
    transition: 0.5s;
    overflow-y: scroll;
    transition: 0.5s;
    background: rgba(255, 255, 255, 0.292);
}
.inforEdificios{
    
    color: aliceblue;
    background: #313C75;
    padding: 5px;
    margin: 5px;
    
    cursor: pointer;
}

.infoCursoSeleccionado{
    
    color: aliceblue;
    background: #313C75;
    padding: 5px;
    margin: 5px;
    width: 350px;
    cursor: pointer;
    font-size: 25px;
}

.infoCursos{
    
    color: aliceblue;
    background: #313C75;
    padding: 10px;
    
    
    cursor: pointer;
}
.infoCursos:hover{
    
    
    background: #5163bb;
    
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

</style>