<template>

    <div class="container">
        <div class="editarEdificios">
            
            <div v-for="item in cursos" :key="item.id">
                <div class="inforEdificios">
                    <button class="botonIr"><ion-icon name="arrow-forward"></ion-icon></button>
                    {{ item.nombre }}
                    
                </div>              
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return{
            cursos:{
                curso:{
                    nombre:"Minas",
                   
                },
                curso2:{
                    nombre:"Electrica",
                
                },
                curso3:{
                    nombre:"Servicios Multiples",
                    
                },
                curso4:{
                    nombre:"Laboratorios",
                   
                },
                curso5:{
                    nombre:"Bienestar Estudiantil",
                   
                },
                curso6:{
                    nombre:"Salas S",
                    
                },
                curso7:{
                    nombre:"Mecanica",
                   
                },
                curso8:{
                    nombre:"Construccion",
                   
                },
                curso9:{
                    nombre:"Salas de Madera",
                    
                }

                
            },
        }
    }

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