<template>
  <div class="menuIzquierda" >
  
  </div>

  <div class="navegacion">
    <ul>
      <li class="list active" >
        <a  >
          <span class="icon"><ion-icon name="person"></ion-icon></span>
          <span class="titulo">Perfil</span>
        </a>
      </li>
      <li class="list">
        <a >
          <span class="icon"><ion-icon name="list-box"></ion-icon></span>
          <span class="titulo">Cursos</span>
        </a>
      </li>
      <li class="list">
        <a >
          <span class="icon"><ion-icon name="funnel"></ion-icon></span>
          <span class="titulo">Salas</span>
        </a>
      </li>
      <li class="list">
        <a>
          <span class="icon"><ion-icon name="add-circle-outline"></ion-icon></span>
          <span class="titulo"> {{nombre}}</span>
        </a>  
      </li>
    </ul>

  </div>

</template>

<script >
export default {


    props:{
          nombre : String,
           
        
    },
    setup(){
      
      
    }
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

  .navegacion:hover{
    width: 200px;
  }

  .list:hover{
    background: #677EF5;
    color: aliceblue;
    cursor: pointer;

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
    width: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  /*
   .navegacion ul li.active{
    background: rgb(56, 67, 165);
  }
  */

  .navegacion ul li a{
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: aliceblue;
  }

  
  .navegacion ul li:hover a::before{
    

  }
  .navegacion ul li:hover  a::after{
    
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