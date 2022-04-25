
<template>
<div class="contenedor" >
  <v-card
    max-width="374"
    v-if="visibleTarjeta"
  >

    <v-img
      height="150"
      :src="urlFoto"
    ></v-img>
      <div class="infoSuperior">
        <h2>  {{texto}}</h2>
        <div >
          • {{texto}}.  Curico, los Niches
        </div>
        <br>
        <div>Descripcion: {{descripcion}}</div>
      </div>
      
      
    

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Salas</v-card-title>
    <div class="infoSala">

    
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
      
        <v-chip>*Sala</v-chip>

        <v-chip>*Sala</v-chip>

        <v-chip>*Sala</v-chip>

        <v-chip>*Sala</v-chip>

      </v-chip-group>
    </div>
    <v-card-actions>
      <div class="botonCerrar">
        <button
          color="deep-green lighten-2"
          text
          @click="reserve"
          
        >
          Cerrar
        </button>
      </div>

    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        visibleTarjeta:true,
      }
      
      
    },
    methods: {
      
      reserve(){
        if(this.visibleTarjeta){
          this.visibleTarjeta=false;
          return this.visibleTarjeta;
        }
        else{
          this.visibleTarjeta=true;
        }
        
      },
    },
    props:{
      texto: String,
      urlFoto:String,
      descripcion:String,
      
    }
    
  }

</script>


<style scoped>
.contenedor {
  position: absolute;
  top: 7%;
  left: 80%;
  width: 300px;
  height: 300px;
  z-index: 30;
  justify-content: center;
  transition: 0.5s;
}

.infoSuperior{

  padding: 20px;
}

.infoSala{
  padding: 0 0 0 20px;
}

.botonCerrar{
  text-align: center;
  padding: 0 0 0 37%;
  border-radius: 5%;
}
.botonCerrar button:hover{

  background: crimson;
  color: aliceblue;
}
button{
  padding: 10% 20% 10% 20%;
  border-radius: 10%;
  transition: 0.5s;
}
</style>



