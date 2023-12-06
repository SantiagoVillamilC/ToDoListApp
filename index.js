const inputElement = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let clearBtn = document.querySelector(".clear-all-btn");
let divTask = document.querySelector(".all-tasks");

//validateStorage();
inputElement.focus();

validateStorage();

function validateStorage(){
    if (typeof(Storage) !== 'undefined') {
        //Comprobacion de la compatibilidad con localStorage
      } else {
        alert("Sorry, your browser does not support the storage function, so it is likely that your information will not be saved or you will experience problems with the app.");
      }
};

actualizarContadorDivs();

function crearNuevoDiv(texto) {
    
    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = "miDiv";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "miCheckbox";

    const parrafo = document.createElement("p");
    const text = document.createTextNode(texto);
    parrafo.appendChild(text);
    parrafo.className = "miP"

    const boton = document.createElement("button");
    // boton.textContent = "Borrar";
    boton.disabled = true;
    boton.className = "miBoton";

    const imgDeleDisabled = document.createElement("img");
    imgDeleDisabled.src = "assets/basura.png";

    boton.appendChild(imgDeleDisabled);

    const imgDeleActivate = document.createElement("img");
    imgDeleActivate.src = "assets/basuraAct.png";

    imgDeleActivate.id = "imgBasuraAct";
    imgDeleDisabled.id = "imgBasuraDsb";

    nuevoDiv.appendChild(checkbox);
    nuevoDiv.appendChild(parrafo);
    nuevoDiv.appendChild(boton);

    divTask.appendChild(nuevoDiv);

    // Guardar contenido del parrafo en el LocalStorage
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            parrafo.style.textDecoration = "line-through";
            boton.disabled = false;

            if (boton.firstChild == imgDeleDisabled){
                boton.replaceChild(imgDeleActivate, imgDeleDisabled);
            }
        } else {
            parrafo.style.textDecoration = "none";
            boton.disabled = true;

            if (boton.firstChild == imgDeleActivate){
                boton.replaceChild(imgDeleDisabled, imgDeleActivate);
            }
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

    inputElement.focus();
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

    contador.innerHTML = '';

    if (divs === 0){
        contador.textContent = `You don't have any tasks! :D`;

        ocultar();
    }
    else if (divs === 1){
        const boldSpan = document.createElement('span');
        boldSpan.id = "numberCount";
        boldSpan.textContent = divs;

        contador.appendChild(document.createTextNode("You only have "));
        contador.appendChild(boldSpan);
        contador.appendChild(document.createTextNode(" task, keep it up"));

        ocultar();
    }
    else{
        const boldSpan = document.createElement('span');
        boldSpan.id = "numberCount";
        boldSpan.textContent = divs;

        contador.appendChild(document.createTextNode("You have "));
        contador.appendChild(boldSpan);
        contador.appendChild(document.createTextNode(" tasks"));
        
        mostrar();
    }
}

function ocultar(){
    document.querySelector(".clear-all-btn").style.display = "none";
}
function mostrar(){
    document.querySelector(".clear-all-btn").style.display = "block";
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