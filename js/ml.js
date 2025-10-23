/*
// Función para crear y agregar una tarjeta
function crearCard(titulo, parrafos, contenedorId) { //Definimos la funcion. 

    const plantilla = document.getElementById("plantilla-card"); //Este template con id="plantilla-card" contiene la
    //estructura base de la tarjeta que se va a clonar

    const clon = plantilla.content.cloneNode(true); //clona el contenido del temple, el que tiene todo vacio


    clon.querySelector("h3").textContent = titulo; //Inserta el texto del título en el <h3> del clon.
                                                  //Reemplaza el contenido vacío del template en <h3> por el valor de titulo.

    const pTags = clon.querySelectorAll("p"); //Selecciona todos los elementos <p> dentro del clon.
    pTags[0].textContent = parrafos[0] || ""; //primer p
    pTags[1].textContent = parrafos[1] || ""; //segundo p
    pTags[2].textContent = parrafos[2] || ""; //Tercer p

    const contenedor = document.getElementById(contenedorId); //Busca el contenedor en el DOM donde se va a insertar la tarjeta.
                                                             //Usa el id que se pasó como argumento.

    if (contenedor) {
        //Si el contenedor existe, inserta el clon dentro de él.
        //Esto hace que la tarjeta aparezca en la página.
        contenedor.appendChild(clon);
    } else {
        //Si el contenedor no existe, muestro un mensaje de advertencia en la consola.
        //avisando que ese id no existe.
        console.warn(`No existe el contenedor con id "${contenedorId}"`);
    }
}

async function cargarCards() {  //Declara una función asíncrona llamada cargarCards, 
                               //lo que permite usar await dentro de ella para manejar 
                              // operaciones que tardan (como leer archivos externos)
  
    try {
    //Usa fetch para pedir el archivo externo cards.json.
    //await espera a que la respuesta llegue antes de continuar. 
    const respuesta = await fetch("ml.json"); //Lo  tengo que cambiar por el json al final vamos a usar
    
    //Convierte la respuesta en formato JSON a un objeto JavaScript.
    //datos será un array de objetos, cada uno representando una tarjeta.
    const datos = await respuesta.json();

    datos.forEach(item => {  
        crearCard(item.titulo, item.parrafos, item.categoria);
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarCards);//Espera a que el HTML esté completamente cargado.
                                                          //Una vez listo, ejecuta la función cargarCards para iniciar el proceso.

*/

/*----------------------Para Modelo de Aprendizaje------------------------------------*/

function crearCard(titulo, parrafos, contenedorId) {
  const plantilla = document.getElementById("plantilla-card");
  const clon = plantilla.content.cloneNode(true);

  // Asigna el título
  clon.querySelector("h3").textContent = titulo;

  // Asigna los párrafos
  const pTags = clon.querySelectorAll("p");
  pTags.forEach((p, i) => {
    p.textContent = parrafos[i] || "";
  });

  // Inserta el clon en el contenedor
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCards() {
  try {
    const respuesta = await fetch("../jsons/ml.json");
    const datos = await respuesta.json();

    // Recorre los items dentro del JSON (el items ese es el nombre que esta en la linea 2 del json).
    datos.items.forEach(item => {
      crearCard(item.titulo, item.parrafos, "tiposDeAprendizage"); //"tiposDeAprendizage es el Id del contenedor donde se van a insertar el itulo y los parrafos"
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

// Espera a que el DOM esté cargado antes de ejecutar
document.addEventListener("DOMContentLoaded", cargarCards);

/*----------------------Fin Para Modelo de Aprendizaje------------------------------------*/

/*------------------------------------Para casos de usos----------------------------------*/
 // - titulo: texto para el <h3>
// - parrafo: texto para el <p>
// - contenedorId: id del elemento donde se insertará.
function crearCar2(titulo, parrafo, contenedorId) {
  
  const plantilla = document.getElementById("plantilla2");// Busca el <template> con id="plantilla2"
  const clon = plantilla.content.cloneNode(true);// Clona el contenido del template para poder modificarlo sin tocar el original

  // Asigna el título
  clon.querySelector("h3").textContent = titulo;

  // Asigna el único párrafo
  clon.querySelector("p").textContent = parrafo;

  // Inserta el clon en el contenedor
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCards2() {// Declara una función asíncrona para cargar datos externos (JSON)
  try {
    const respuesta = await fetch("../jsons/ml.json"); // // Hace una peticion al archivo JSON 
    const datos = await respuesta.json();  // Convierte la respuesta a objeto JS

    // Recorre los items2 dentro del JSON
    datos.items2.forEach(item => { // Asume que el JSON tiene una propiedad 'items2' que es un array
      crearCar2(item.titulo, item.parrafo, "casosDeUso");// Por cada elemento, llama a crearCar2 pasando título, párrafo y el id del contenedor donde insertar
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarCards2);// Ejecuta cargarCards2 cuando el DOM esté completamente cargado
/*------------------------------------Fin Para casos de usos----------------------------------*/

/*---------------------------------------Para Ventajas y Desventajas------------------------------------------------------------------------ */
function crearCardVentDes(titulo, lista, contenedorId) {
  const plantilla = document.getElementById("plantilla3");
  const clon = plantilla.content.cloneNode(true);

  // Asigna el título
  clon.querySelector("h3").textContent = titulo;

  // Asigna los ítems de la lista
  const liTags = clon.querySelectorAll("li");
  liTags.forEach((li, i) => {
    li.textContent = lista[i] || ""; // Evita errores si hay menos de 3 elementos
  });

  // Inserta el clon en el contenedor
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCardsVentDes() {
  try {
    const respuesta = await fetch("../jsons/ml.json"); 
    const datos = await respuesta.json();

    // Recorre los items3 (por ejemplo)
    datos.items3.forEach(item => {
      crearCardVentDes(item.titulo, item.lista, "VentDes");
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarCardsVentDes);
/*---------------------------------------Fin Para Ventajas y Desventajas-------------------------------------------------------------------- */