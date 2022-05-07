 <!--template>

    <div class="container">
        <div onload=""   class="editarEdificios" >
            
            <div v-for="item in cursos" :key="item.id">
                <div class="inforEdificios">
                    <button class="botonIr"><ion-icon name="arrow-forward"></ion-icon></button>
                    {{ item }}
                    
                </div>              
            </div>
        </div>
    </div>
</template> -->



<template>

  <div class="navegacion">
    <ul>
      <li  class="selectMenu" >
        <div @click="select" class="select">
        <input type="text" class="textBox" placeholder="Seleccionar edificio" readonly>
          <div class="option">
              <div v-for="item in cursos" :key="item.id">

                  <div  @click="ir"  class="inforEdificios">
                      
                    <button class="botonIr"  > <ion-icon name="add-circle"></ion-icon></button>
                   
                    <div @click="show(item)">{{item}}</div>
                    
                </div> 
                  

              </div> 
               
          </div>
        </div>
      </li>

      <div v-for="item in salasEd" :key="item.id">

 
          <li class="list">
          <router-link to="/">
            <a @click="mostrarMONO">
              <span class="icon"  ><ion-icon name="list-box"></ion-icon></span>
                {{ item }}
              
              <span class="titulo">

                



              </span>
              
            </a>
            
          </router-link>
           
        </li>
        
      </div>
        

    </ul>
     
  

  </div>
    
  

</template>




<script>

import API from "@/api";
export default {

   
    data(){
        return{

            cursos:[ ],
            salasEd:[ ],
        }
    },methods: {
        async getEdificios(){
            this.cursos = await API.getEdificios()   
            
        },


        escribir() {
            alert("hola");
        },
        async show(anything){
            const EdificioSeleccionado=document.querySelector('.textBox').value = anything;
            
            this.salasEd= await API.getSalasByName(EdificioSeleccionado)
            console.log(this.salasEd)
        },
        async select(){
            this.edificios = await API.getEdificios()
            
            var dropdown = document.querySelector('.select');
            
            dropdown.onclick = function (){
                dropdown.classList.toggle('active');
               
            }
        },
        mostrarMONO(){
          console.log("sadaskldmsalkdmaslk "+this.nombre);
        },

       
    },beforeMount() {
        this.getEdificios()
      
    },
        
        
    
    props: {
        nombre: String,
        posMonito: String
    },
    };
</script>




<style scoped>

/* .container{
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
} */




 .blanco{
      color: aliceblue;
    }
   .navegacion{

    display: inline-block;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    color: rgb(38, 64, 87);
    width: 250px;
    height: 93.7vh;
    background: #0b1a9b;
    overflow-x: hidden;
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
    height: 0px;
    line-height: 0px;
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


.select{
    position: relative;
    width: 240px;
    height: 50px;
    z-index: 10;
}

.select:-moz-placeholder {
   opacity: 0;
}

.select::before{
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #333;
    right: 20px;
    top: 15px;
    z-index: 10000;
    border-top: 2px solid white;
    border-right: 2px solid white;
    transform: rotate(-45deg);
    transition: 0.5s;
    pointer-events: none;
}

.select.active::before{
    top: 22px;
    transform:rotate(-225deg);
}
.select input{
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background: white;
    border: none;
    outline: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.745);
    padding: 12px 20px;
    border-radius: 10px;
}
.select .option{
    position: absolute;
    top: 70px;
    width: 100%;
    background: white;
    box-shadow: 0 30px 30px black;
    border-radius: 10px;
    
    display: none;
    color: #333;
}

.select.active .option{
    display: block;
}

.select .option div{
    padding: 12px 20px;
    cursor: pointer;
}
.select .option div:hover{
    background: #677EF5;
    color: aliceblue;
}

.option{
  display: inline-block;
  box-sizing: border-box;
  max-height: 200px;
  
  overflow-y: scroll;
  
}

.botonIr{
    position: absolute;
    width: 30px;
    height: 70px;
    left: 86%;
    background: #677EF5;
    transition: 0.5s;
}
.botonIr:hover{
    background: #313C75;
} 


</style>