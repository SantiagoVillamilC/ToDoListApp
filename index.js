const inputElement = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let clearBtn = document.querySelector(".clear-all-btn");

//validateStorage();

function validateStorage(){
    if (typeof(Storage) !== 'undefined') {
        alert("Compatible");
      } else {
        alert("Lo compatible");
      }
}

addBtn.addEventListener("click", function () {

    const data = inputElement.value.trim();

    if (data === "") {
        alert("El campo de entrada está vacío. Por favor, ingresa algo.");
    } else {
        localStorage.setItem("miDato", data);
        alert("Información guardada en localStorage.");

        let dato = localStorage.getItem("miDato");
        alert("Datos:" + dato);
    }
});

clearBtn.addEventListener("click", function (){
    localStorage.clear()
    alert("Almacenamiento limpio")
})