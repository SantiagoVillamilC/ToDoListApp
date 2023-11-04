const inputElement = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let clearBtn = document.querySelector(".clear-all-btn");
let divTask = document.querySelector(".all-tasks");

var identificador = 0;

//validateStorage();

function validateStorage(){
    if (typeof(Storage) !== 'undefined') {
        alert("Compatible");
      } else {
        alert("No compatible");
      }
};

addBtn.addEventListener("click", function () {

    const data = inputElement.value.trim();

    if (data === "") {
        alert("El campo de entrada está vacío. Por favor, ingresa algo.");
    } else {
        localStorage.setItem("miDato", data);
        alert("Información guardada en localStorage.");

        inputElement.value = "";

        let dato = localStorage.getItem("miDato");
        alert("Datos:" + dato);

        addTask(dato);
    }
});

function addTask(info){

    let divIndividual = document.createElement("div");
    divIndividual.id = "individualClass";

    
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    var nameCheckBox = "checkbox" + identificador;
    checkbox.id = nameCheckBox;

    // alert("Id check: " + nameCheckBox);

    let parr = document.createElement("p");
    let text = document.createTextNode(info);
    parr.appendChild(text);
    parr.id = "texto"+identificador;

    let btnDeleteTask = document.createElement("button");
    btnDeleteTask.textContent = "Borrar";
    var nameBtnDeleteTask = "boton"+identificador;
    btnDeleteTask.id = nameBtnDeleteTask;

    //Estilos
    divIndividual.style.backgroundColor = "white";
    divIndividual.style.borderRadius = "25px";
    divIndividual.style.color = "black";
    divIndividual.style.height = "auto";

    divTask.appendChild(divIndividual);

    divIndividual.appendChild(checkbox);
    divIndividual.appendChild(parr);
    divIndividual.appendChild(btnDeleteTask);

    alert("Se imprime" + info);

    identificador++;

    checkbox.addEventListener("change", function() {
        if (nameCheckBox.checked){
            btnDeleteTask.disabled = false;
        }
        else{
            btnDeleteTask.disabled = true;
        }
    });
};

clearBtn.addEventListener("click", function (){
    localStorage.clear();
    alert("Almacenamiento limpio");
});

