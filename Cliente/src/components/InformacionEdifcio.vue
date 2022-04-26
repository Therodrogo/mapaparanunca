<template>
 <div class="contenedor" >
    <v-responsive min-width="100" >
   
      <v-card max-width="374" v-if="visibleTarjeta">
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
     
    </v-responsive>
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
  position: absolute;
  top: 10%;
  left: 81%;
  z-index: 30;
  justify-content: center;
  transition: 0.5s;
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
  text-align: center;
  padding: 0 0 0 37%;
  border-radius: 5%;
}
.botonCerrar button:hover {
  background: crimson;
  color: aliceblue;
}
button {
  position: relative;
  justify-content: center;
  padding: 7%;
  right: 10px;
  margin: 0 0 0 10px;
  border-radius: 50%;
  font-size: 14px;
  transition: 0.5s;
  width: 70px;
  background-color: #313c75;
  color: aliceblue;
}
button:hover {
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