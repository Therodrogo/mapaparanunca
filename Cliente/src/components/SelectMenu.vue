<template>
  <div @click="select" class="select">
      <input type="text" class="textBox" placeholder="Seleccionar edificio" readonly>
      <div class="option">
      <div @click="show('Edificio de mina')">Edificio de mina</div>
      <div @click="show('Edificio de bienestar')">Edificio de bienestar</div>
    </div>
  </div>
</template>

<script>
export default {

    methods:{
        show(anything){
            document.querySelector('.textBox').value = anything;
        },
        select(){
            var dropdown = document.querySelector('.select');
            dropdown.onclick = function (){
                dropdown.classList.toggle('active');
            }
        }

    }

}
</script>

<style scoped>
body{

    display: flex;
    justify-content: center;
    min-height: 100vh;
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
    overflow: hidden;
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
</style>