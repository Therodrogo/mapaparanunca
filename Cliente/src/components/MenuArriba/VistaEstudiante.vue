<template>

    <div class="container">
        <div class="cursos">
            <div class="dia">Lunes</div>
            <div class="dia">Martes</div>
            <div class="dia">Miercoles</div>
            <div class="dia">Jueves</div>
            <div class="dia">Viernes</div>
            <div class="dia">Sabado</div>

            <div v-for="item in cursos" :key="item.id">
                <div class="inforCurso">
                    <button @click="mostrarInfo" class="botonIr"><ion-icon name="arrow-forward"></ion-icon></button>
                    {{ item.nombre }} <br>
                    {{ item.sala }} <br>
                    {{item.horario}}
                    
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
            cursos:{
                curso:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso2:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso3:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso4:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso5:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso6:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso7:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso8:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                },
                curso9:{
                    nombre:"Redes de computadores",
                    sala:"Sala: T-1", 
                    horario:"Horario: 8:30-9:30  10:40-11:40"
                }

                
            },
        }
    },props:{
        idUsuario:String
    },methods: {
        async mostrarInfo(){
            var res = await API.getAsisteById(this.idUsuario)
            console.log(res)
        }
    },beforeMount() {
        this.mostrarInfo()
       
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