<template>

    <div class="container">
        <div class="editarEdificios" >
            
            <div v-for="(item) in cursos" :key="item.id">
                <div @click="botonIr(item)" v-if="cursoNoSeleccionado" class="infoCursos">
                    
                     <!-- {{index }} : {{ item.nombre }} - Sección {{ item.seccion }} -->
                       {{ item }}
                    
                </div>              
            </div>
            <div>
                <div v-if="cursoSeleccionado" class="infoCursoSeleccionado">
                    <button @click="botonIr()"><ion-icon name="md-arrow-round-back"></ion-icon></button>
                
                   
                    <div class="formularioEditar">
                                         
                    <v-list-item>
                        <v-list-item-content class="justify-center">
                            <v-list-item-title  class="formularioEditar"> {{ EdificioSeleccionado}}   </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                        <v-select 
                            
                                
                                autowidth
                                :items="salas"
                                label="Sala(s)"
                                outlined
                                dense
                                
                        >
                        </v-select>

                  <div id="Sala">
                     <h3> Nueva Sala:  
                         <input class="caja" type="text" name="nombre" size="10"
                    placeholder="Nombre sala" v-model="nombreSala">
                     </h3>
                    
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
    </div>
</template>


<script>
import API from "@/api";
import swal from "sweetalert";
export default {

    data(){

       

        return{
            
            cursoNoSeleccionado: true,
            cursoSeleccionado:false,
            indexCursoSeleccionado:0,
            cursos:[ ],   
            salas:[],
            EdificioSeleccionado: "",
            nombreSala: "",

          
           
        };

       

    },methods: {


        
        
        async getEdificios(){
            
            this.cursos = await API.getEdificios() 
          //  console.log(this.cursos)
            
           
        },      

        async botonIr(cursoSeleccionado){
            //Guardamos el curso seleccionado
            
          // console.log(cursoSeleccionado);
            this.EdificioSeleccionado=cursoSeleccionado;
             this.salas= await API.getSalasByName(this.EdificioSeleccionado);
          //  console.log("Holaaaa" + this.salas);
        
            this.cursoNoSeleccionado=!this.cursoNoSeleccionado;
            this.cursoSeleccionado=!this.cursoSeleccionado;
         
            //this.idCursoSeleccionado=cursoSeleccionado;

            
          
            //QUITAMOS DUPLICADOS EN LAS SALAS
          
            
            //Guardamos los valores antiguos de las salas
           
        },

        

 async guardarSala(){


           
         var flag = false;
        var todas = await API.getAllSalas()


        todas.forEach(element => {
          
            if(element.nombre==this.nombreSala){
                flag=true;
            }

        });
    
     /*    for (var index in todas) {
            if(index!=this.nombreSala){
                flag=true;
            }
        console.log(todas[index]);
        } */

        if(flag==true){
            swal("Nombre de sala ya existe", "Sala no fue creada", "error");
        }
        else{
            swal("Listo", "Sala Creada con éxito", "success");
        }

          //console.log(await API.getAllSalas());
          
          
          //  this.cursoNoSeleccionado= true;
          //  this.cursoSeleccionado=false;
           //// console.log(this.hora_ini_nueva);
          //  console.log(this.hora_fin_nueva);
          //  console.log(this.sala_nueva);
        //    /* Hora_Inicio = */ this.cursos[this.indexCursoSeleccionado].hora_inicio=this.hora_ini_nueva;
        //    /* Hora_Final = */ this.cursos[this.indexCursoSeleccionado].hora_final=this.hora_fin_nueva;
          //  /* Sala = */ this.cursos[this.indexCursoSeleccionado].id_sala.nombre=this.sala_nueva;
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


.caja{

    background: #eeedf4;
}


.formBx{
    display: inline-block;
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    margin: 10px;
    z-index: 32;
    transition: 0.5s;

    border-radius: 5%;
    
}

.formBx .form{

    padding: 50px;
    transition: 0.5s;
}

.formBx .form form{
    float: center;
    display: flex;
    flex-direction: column;
}

.formBx .form form h3{
    font-size: 1.5em;
    color: #313C75;
    margin-bottom: 20px;
    font-weight: 500;
}

.formBx .form form input{
    margin-bottom: 20px;
    padding: 10px;
    outline: none;
    font-size:16px;
    border: 1px solid #313C75;
    color:#313C75;
    
}
</style>