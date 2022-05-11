<template>

    <div class="container">
        
        <div class="cursos">
            
            <div @click="mostrarInfo('Lunes')" class="Lunes">Lunes</div>
            <div @click="mostrarInfo('Martes')" class="Martes">Martes</div>
            <div @click="mostrarInfo('Miercoles')" class="Miercoles">Miercoles</div>
            <div @click="mostrarInfo('Jueves')" class="Jueves">Jueves</div>
            <div @click="mostrarInfo('Viernes')" class="Viernes">Viernes</div>
            <div @click="mostrarInfo('Sabado')" class="Sabado">Sabado</div>
           

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
    data: () => ({
        diaCurso: "",
        dia: [],
        menu: "vistaEstudiante",
        diaHoy:""
    }),
    props: {
        idUsuario: String
    },
    methods: {
        async mostrarInfo(text) {
            this.cambiarColor(text)
            var res = await API.getAsisteById(this.idUsuario);
            this.dia = [];
            this.diaCurso = text;
            res.forEach(async (element) => {
                var curso = {
                    nombre: "",
                    sala: "Sala: ",
                    horario: "Horario: ",
                    edificio: "asd"
                };
                if (this.diaCurso == element.dia) {
                    curso.nombre = element.id_curso.nombre;
                    curso.sala = curso.sala + element.id_sala.nombre;
                    curso.horario = curso.horario + element.hora_inicio + " " + element.hora_final;
                    curso.edificio = await getEdificio(element.id_sala.nombre);
                    this.dia.push(curso);
                }
            });
        },
        generarRutaMisCursos() {
        },
        obtenerDia() {
            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);
            const fecha = hoy.toDateString();
            const diaText = fecha.split(" ");

            if(diaText[0]=="Mon"){
                this.diaHoy = "Lunes"
            }
            if(diaText[0]=="Tue"){
                this.diaHoy = "Martes"
            }
            if(diaText[0]=="Wed"){
                this.diaHoy = "Miercoles"
            }
            if(diaText[0]=="Thu"){
                this.diaHoy = "Jueves"
            }
            if(diaText[0]=="Fri"){
                this.diaHoy = "Viernes"
            }
            if(diaText[0]=="Sat"){
                this.diaHoy = "Sabado"
            }
        },
        cambiarColor(text){
            const dias = ['.Lunes','.Martes','.Miercoles','.Jueves','.Viernes','.Sabado']
            const dia = "."+text
            dias.forEach( element=> {

                if(element==dia){
                    const btn = document.querySelector(dia)
                    btn.style.backgroundColor ="#677EF5"
                }
                else{
                    const btn = document.querySelector(element)
                    btn.style.backgroundColor ="#313C75"
                }
                
            });
            
        },
    },
    mounted(){
        this.obtenerDia()
        this.mostrarInfo(this.diaHoy)
        console.log("")
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
    overflow-y: auto;
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
.Lunes{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #313C75;
    transition: 0.5s;
}
.Martes{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #313C75;
    transition: 0.5s;
}
.Miercoles{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #313C75;
    transition: 0.5s;
}
.Jueves{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #313C75;
    transition: 0.5s;
}
.Viernes{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #313C75;
    transition: 0.5s;
}
.Sabado{
    display: inline-block;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    position: relative;
    left: 2%;
    padding: 5px 5px;
    margin: 0 0 0 3px;
    border-color: white;
    background: #313C75;
    transition: 0.5s;
}

</style>