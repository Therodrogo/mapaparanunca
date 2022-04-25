<template>
  
<div class="contenedor">
    <v-img
            lazy-src=""
            max-height="relative"
            max-width="relative"
            src="https://media.infocielo.com/p/95578089cc23aa0160484c7678532474/adjuntos/299/imagenes/001/350/0001350394/1200x1200/smart/coscu-frente-todospngjpg.jpg"
            class="logo"
        >
        </v-img>
</div>




</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
        url:String
    },
    
}
</script>



<style>

.contenedor{
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