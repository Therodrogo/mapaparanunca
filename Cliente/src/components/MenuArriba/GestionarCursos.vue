 <template>

    <div class="container">
        <div class="editarEdificios" >
            
            <div v-for="item in salas" :key="item.id">
                <div class="inforEdificios">
                    <button class="botonIr"><ion-icon name="arrow-forward"></ion-icon></button>
                    Sala {{ item }}
                    
                    
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
            cursos:[ ],
            salas: [ ]
        }
    },methods: {
        async getEdificios(){
            this.cursos = await API.getAllAsistes()   
            this.cursos.forEach(element => {
                this.salas.push(element.id_sala.nombre)
            });
            console.log(this.cursos[0].id_sala.nombre)
        }
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