const inputElement = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let clearBtn = document.querySelector(".clear-all-btn");
let divTask = document.querySelector(".all-tasks");

//validateStorage();
inputElement.focus();

function validateStorage(){
    if (typeof(Storage) !== 'undefined') {
        alert("Compatible");
      } else {
        alert("No compatible");
      }
};

actualizarContadorDivs();

function crearNuevoDiv(texto) {
    
    const nuevoDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const parrafo = document.createElement("p");
    const text = document.createTextNode(texto);
    parrafo.appendChild(text);

    const boton = document.createElement("button");
    boton.textContent = "Borrar";
    boton.disabled = true;

    nuevoDiv.appendChild(checkbox);
    nuevoDiv.appendChild(parrafo);
    nuevoDiv.appendChild(boton);

    divTask.appendChild(nuevoDiv);

    //Estilos
    nuevoDiv.style.backgroundColor = "white";
    nuevoDiv.style.borderRadius = "25px";
    nuevoDiv.style.color = "black";
    nuevoDiv.style.height = "auto";
    nuevoDiv.style.display = "grid";
    nuevoDiv.style.gridTemplateColumns = "15% 70% 15%";
    // nuevoDiv.style.wordBreak = "break word";
    nuevoDiv.style.width = "100%"

    // Guardar contenido del parrafo en el LocalStorage
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            parrafo.style.textDecoration = "line-through";
            boton.disabled = false;
        } else {
            parrafo.style.textDecoration = "none";
            boton.disabled = true;
        }
    });

    boton.addEventListener("click", function () {

        nuevoDiv.remove();

        // Borra el texto del arreglo y actualiza el LocalStorage
        const textos = JSON.parse(localStorage.getItem("textos")) || [];
        const index = textos.indexOf(texto);
        if (index !== -1) {
            textos.splice(index, 1);
            localStorage.setItem("textos", JSON.stringify(textos));
        }

        actualizarContadorDivs();

    });

    actualizarContadorDivs();
}

addBtn.addEventListener("click", function () {

    const texto = inputElement.value.trim();

    if (texto === "") {
        alert("El campo de entrada está vacío. Por favor, ingresa algo.");
    } else {
        // Obtener el arreglo de textos del LocalStorage
        const textos = JSON.parse(localStorage.getItem("textos")) || [];
        // Agrega el nuevo texto al arreglo
        textos.push(texto);
        // Guarda el arreglo en el LocalStorage
        localStorage.setItem("textos", JSON.stringify(textos));

        crearNuevoDiv(texto);

        inputElement.value = "";
    }
});

// Comprueba si hay textos guardados en el LocalStorage al cargar la pagina
const textosGuardados = JSON.parse(localStorage.getItem("textos")) || [];

textosGuardados.forEach(function (texto) {
    // Llama a la función para crear un nuevo div con cada texto guardado
    crearNuevoDiv(texto);
});

function actualizarContadorDivs() {
    const contador = document.getElementById("contadorDivs");
    const divs = divTask.childElementCount;

    if (divs === 0){
        contador.textContent = `No tienes tareas :c`;
    }
    else{
        contador.textContent = `Número de Divs: ${divs}`;
    }
}

clearBtn.addEventListener("click", function (){
    clearAll();
});

function clearAll(){

    let opcion = confirm("¿Estas segur@ de querer borrar todo?")
    if (opcion === true){
        localStorage.clear();
        textosGuardados.lenght = 0;
        alert("Almacenamiento limpio");
        while(divTask.firstChild){
            divTask.removeChild(divTask.firstChild);
        }
        actualizarContadorDivs();
    }else{
        alert("No borraste tus tareas");
    }
}
