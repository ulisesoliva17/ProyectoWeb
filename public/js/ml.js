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
    const respuesta = await fetch("../../jsons/ml.json");
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
    const respuesta = await fetch("../../jsons/ml.json"); 
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