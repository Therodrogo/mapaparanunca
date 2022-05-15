
<template>
  <div class="contenedor">
      <div class="select-box">
        <div class="options-container">

          <div class="option">
            <input type="radio" class="radio" id="tutorials" name="category" />
            <label for="tutorials">Tutorials</label>
          </div>

          <div class="option">
            <input type="radio" class="radio" id="auto" name="category" />
            <label for="tutorials">Auto</label>
          </div>

          <div class="option">
            <input type="radio" class="radio" id="auto" name="category" />
            <label for="tutorials">Casa</label>
          </div>

        </div>

        <div @click="seleccionar" class="selected">
          Selecciona Curso
        </div>

        <div class="search-box">
          <input type="text" placeholder="Buscar" />
        </div>

      </div>

    </div>
</template>

<script >
var optionsContainer;
var selected;
var searchBox;
var filterList;
var optionsList;

export default{
    data(){
        return{
            seleccion:""
        }
    },
    methods:{
        seleccionar(){
                   
            optionsContainer.classList.toggle("active");
            searchBox.value = "";
            filterList("");
            if (optionsContainer.classList.contains("active")) {
                searchBox.focus();
            }

        },
        notifica(){

        }

    },
    mounted(){
        optionsContainer = document.querySelector(".options-container");
        searchBox = document.querySelector(".search-box input");
        selected = document.querySelector(".selected");
        optionsList = document.querySelectorAll(".option");

        optionsList.forEach(o => {
            o.addEventListener("click", () => {
                selected.innerHTML = o.querySelector("label").innerHTML;
                this.seleccion = selected.innerHTML;
                optionsContainer.classList.remove("active");
                this.$emit('notifica',this.seleccion)

            });
        });

        searchBox.addEventListener("keyup", function(e) {
            filterList(e.target.value);
        });
        filterList = searchTerm => {
            searchTerm = searchTerm.toLowerCase();
            optionsList.forEach(option => {
                let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
               
                if (label.indexOf(searchTerm) != -1) {
                    option.style.display = "block";
                } else {
                    option.style.display = "none";
                }
            });
        };
    }
}


</script>

<style scoped>

.contenedor {
  z-index: 1000;
  overflow-y: auto;
  height: 500px;
  background: #f5f6fab0;
  border-radius: 2%;
  margin:  5px 0 0 0;
  overflow-x: none;
}

.select-box {
  position: relative;
  display: flex;
  width: 375px;
  flex-direction: column;
}

.select-box .options-container {
  background: #313C75;
  color: #f5f6fa;
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 8px;
  overflow: hidden;
  order: 1;
}

.selected {
  background: #313C75;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #f5f6fa;
  position: relative;
  

  order: 0;
}

.selected::after {
  content: "";
  background: url("@/assets/arrow-down.svg");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 100%;
  width: 32px;
  right: 10px;
  top: 5px;

  transition: all 0.4s;
}

.select-box .options-container.active {
  max-height: 240px;
  opacity: 1;
  overflow-y: auto;
  margin-top: 54px;
  
}

.select-box .options-container.active + .selected::after {
  transform: rotateX(180deg);
  top: -6px;
}

.select-box .options-container::-webkit-scrollbar {
  width: 8px;
  background: #313C75;
  border-radius: 0 8px 8px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #313C75;
  border-radius: 0 8px 8px 0;
}

.select-box .option,
.selected {
  padding: 12px 24px;
  cursor: pointer;
}

.select-box .option:hover {
  background: #677EF5;
}

.select-box label {
  cursor: pointer;
}

.select-box .option .radio {
  display: none;
}

/* Searchbox */

.search-box input {
  width: 100%;
  padding: 12px 16px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  position: absolute;
  border-radius: 8px 8px 0 0;
  z-index: 100;
  border: 8px solid #313C75;
  background: #f5f6fa;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
}

.search-box input:focus {
  outline: none;
}

.select-box .options-container.active ~ .search-box input {
  opacity: 1;
  pointer-events: auto;
}
</style>