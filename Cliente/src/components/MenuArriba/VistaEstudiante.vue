<template>

    <div class="container">
        <div class="cursos">
            <div @click="mostrarInfo('Lunes')" class="dia">Lunes</div>
            <div @click="mostrarInfo('Martes')" class="dia">Martes</div>
            <div @click="mostrarInfo('Miercoles')" class="dia">Miercoles</div>
            <div @click="mostrarInfo('Jueves')" class="dia">Jueves</div>
            <div @click="mostrarInfo('Viernes')" class="dia">Viernes</div>
            <div @click="obtenerDia" class="dia">Sabado</div>

            <div v-for="item in dia" :key="item.id">
                <div class="inforCurso">
                    <button @click="$emit('generarRutaMisCursos',item.edificio,menu)" class="botonIr"><ion-icon name="arrow-forward"></ion-icon></button>
                    {{ item.nombre }} <br>
                    {{ item.sala }} <br>
                    {{ item.horario}}
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import API from "@/api"


export default {

    data(){
        return{
            diaCurso:"",
            dia:[],
            menu:"vistaEstudiante"
        }
    },
    props:{
        idUsuario:String

    },methods: {
        async mostrarInfo(text){
            
            var res = await API.getAsisteById(this.idUsuario)
            this.dia= []
            this.diaCurso =text
            res.forEach(async element => {
                var curso={
                    nombre:"",
                    sala:"Sala: ", 
                    horario:"Horario: ",
                    edificio:"asd"
                }

                if(this.diaCurso==element.dia){
                    curso.nombre = element.id_curso.nombre
                    curso.sala = curso.sala + element.id_sala.nombre
                    curso.horario =curso.horario + element.hora_inicio +" "+ element.hora_final
                    curso.edificio= await getEdificio(element.id_sala.nombre)
                    this.dia.push(curso)
                }
                
            });

        },
        generarRutaMisCursos(){

        },
        obtenerDia(){
            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);
            const fecha = hoy.toDateString()

            const diaText = fecha.split(" ")
            
            console.log(diaText[0])
        }
        

    }

}
async function getEdificio(sala){
    const res = await API.getEdificioByNombreSala(sala)
    return res

}

</script>

<style scoped>

.container{
    float: right;
    display: inline-block;
    box-sizing: border-box;
    margin: 10px 0 0 0;
    width: 400px;
    color: aliceblue;
    transition: 0.5s;
}
.cursos{
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
.inforCurso{
    
    color: aliceblue;
    background: #313C75;
    padding: 5px;
    margin: 5px;
    
    cursor: pointer;
}

.botonIr{
    position: absolute;
    width: 30px;
    height: 70px;
    left: 86%;
    background: #313C75;
    transition: 0.5s;
}
.botonIr:hover{
    background: #677EF5;
}
.dia{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
   
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #0751DE;
    border-radius: 25%;
}
.dia:hover{
    background: #0684D4;

}
</style>