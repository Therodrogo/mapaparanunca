<template>
  <div class="menuIzquierda" >
    
  

  
  
  <div class="navegacion">
    <ul>
      
      <li  class="selectMenu" >
        
        <SelectMenu/> 
      </li>
      <li class="list" @click="created">
        <a >
          <span class="icon"><ion-icon name="list-box"></ion-icon></span>
          <span class="titulo">{{
            
        }}</span>
        </a>
      </li>
      <li class="list">
        <a >
          <span class="icon"><ion-icon name="funnel"></ion-icon></span>
          <span class="titulo">Espacio vacio</span>
        </a>
      </li>
      <li class="list">
        <a>
          <span class="icon"><ion-icon name="add-circle-outline"></ion-icon></span>
          <span class="titulo"> Espacio vacio</span>
        </a>  
      </li>
    </ul>

  </div>
</div>
  

</template>

<script >
import API from "@/api";
import SelectMenu from "./SelectMenu.vue";

export default {
    data() {
        return {
          datosusuario:{
            nombreusuario:12312,
            contraseña:"123123"
          }
        };
    },
    props: {
        nombre: String,
    },
    setup() {
    },
    methods: {
        escribir() {
            alert("hola");
        },
        async login(){
          const res = await API.validarusuario(this.datosusuario)
          console.log(res)  
        }
    },
    components: { SelectMenu }
}
</script>

<style scoped>
  
   .navegacion{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    position: relative;
    color: rgb(38, 64, 87);
    
    z-index: 2;

    width: 70px;
    height: 100vh;
    background: #313C75;
   
    overflow-x: hidden ;
    transition: 0.5s;
  }

  .navegacion:hover {
    width: 250px;
    transition: 0.5s;
    
  }

  .navegacion:hover .list{
    
    display: block;
  }
  .navegacion:hover .selectMenu{
    display: block
  }
  .selectMenu{
    display: none;
  }

  .list{
    display: none;
  }
  .list:hover{
    
    color: aliceblue;
    cursor: pointer;
    background: #677EF5;

  }

  .navegacion ul{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 5px;
    padding-top: 40px;
  }

  .navegacion ul li{
    position: relative;
    list-style: none;
    width: 98%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }



  .navegacion ul li a{
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: aliceblue;
  }


  .navegacion ul li a .icon{
    position: relative;
    display: block;
    min-width: 60px;
    height: 60px;
    line-height: 70px;
    text-align: center;
  }

  .navegacion ul li a .icon ion-icon{
    position: relative;
    font-size: 1.5em;
    z-index: 1;

  }
  .navegacion ul li a .titulo{
    position: relative;
    display: block;
    padding-left: 10px ;
    height: 60px;
    line-height: 60px;
    white-space: nowrap ;
  }

</style>