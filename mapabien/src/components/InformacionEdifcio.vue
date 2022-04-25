
<template>
<div class="contenedor" >
  <v-card
    max-width="374"
    v-if="visibleTarjeta"
  >


    <v-img
      height="250"
      src="https://media.infocielo.com/p/95578089cc23aa0160484c7678532474/adjuntos/299/imagenes/001/350/0001350394/1200x1200/smart/coscu-frente-todospngjpg.jpg"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      visibleTarjeta:true,
      loading: false,
      selection: 1,
    }),
    methods: {
      noVisible () {
        this.visibleTarjeta=false;
      },
      reserve() {
        this.visibleTarjeta=false;
      },
    },
    
  }

</script>


<style>
.contenedor {
  position: absolute;
  top: 100px;
  left: 100px;
  width: 300px;
  height: 300px;
  z-index: 30;
  background-color: beige;
  justify-content: center;
}
</style>



