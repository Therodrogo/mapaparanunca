<template>
 <div class="contenedor" >
    
      <div class="carta">
        
      <v-card v-if="visibleTarjeta">
        <button @click="reserve" class="botonCerrar">X</button>

        <v-img height="150" :src="urlFoto"></v-img>
        
        <div class="infoSuperior">
          <h2>{{ texto }}</h2>
          <div>• {{ texto }}. Curico, los Niches</div>
          <br />
          <div>Descripcion: {{ descripcion }}</div>
        </div>
        <v-divider class="mx-4"></v-divider>

        <v-card-title>Salas</v-card-title>
        <div class="infoSala">
          <div class="contButton" v-for="item in salas" :key="item.id">
            <button>{{ item }}</button>
          </div>
        </div>
        <br />
      </v-card>
      </div>
     
     </div>

</template>

<script>
export default {
  data() {
    return {
      visibleTarjeta: true,
    };
  },
  methods: {
    reserve() {
      if (this.visibleTarjeta) {
        this.visibleTarjeta = false;
        return this.visibleTarjeta;
      } else {
        this.visibleTarjeta = true;
      }
    },
  },
  props: {
    texto: String,
    urlFoto: String,
    descripcion: String,
    salas: Array,
  },
};
</script>


<style scoped>
.contenedor {
  
  float: right;
  display: flex;
  justify-content: right;
  margin: 10px 0 0 0;
  position: relative;
  width: 40vh;
  height: 60%;
  z-index: 30;
  transition: 0.5s;
}
.carta{

  width: 50vh;
  height: 60%;
  position: relative;
  left: 3%;
}

.imagenCard {
  top: 10%;
  margin-top: 10px;
}

.infoSuperior {
  padding: 20px;
}

.infoSala {
  padding: 0 0 0 20px;
}

.botonCerrar {
  transition: 0.5s;
  float: right;
  text-align: center;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 90%;
  background: #ffffff;
  color: #313c75;
  
  padding: 0 0 0 0;
  border-radius: 50%;
  z-index: 60;
}

.contButton {
  position: relative;
  text-align: center;
  justify-content: center;
  
  padding:2.5%;
  right: 10px;
  margin: 0 0 0 10px;
  border-radius: 50%;
  font-size: 14px;
  transition: 0.5s;
  width: 70px;
  background-color: #313c75;
  color: aliceblue;
}
.contButton:hover {
  background: #677ef5;
}

h2 {
  color: #313c75;
}
.contButton {
  display: inline-block;
  position: relative;
}
</style>