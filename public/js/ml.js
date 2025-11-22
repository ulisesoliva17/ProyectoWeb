/*----------------------Para Modelo de Aprendizaje------------------------------------*/

function crearCard(titulo, parrafos, contenedorId) {
  const plantilla = document.getElementById("plantilla-card");
  const clon = plantilla.content.cloneNode(true);

  clon.querySelector("h3").textContent = titulo;

  const pTags = clon.querySelectorAll("p");
  pTags.forEach((p, i) => {
    p.textContent = parrafos[i] || "";
  });

  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCards() {
  try {
    // CAMBIO 1: Agregué "/" al inicio para ruta absoluta
    const respuesta = await fetch("/api/ml/tipos"); 
    const datos = await respuesta.json();

    // CAMBIO 2: Usamos 'datos' directo. Quitamos '.items'
    // Como el servidor ya nos dio la lista limpia, 'datos' ES el array.
    datos.forEach(item => {
      crearCard(item.titulo, item.parrafos, "tiposDeAprendizage");
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarCards);

/*----------------------Fin Para Modelo de Aprendizaje------------------------------------*/

/*------------------------------------Para casos de usos----------------------------------*/

function crearCar2(titulo, parrafo, contenedorId) {
  const plantilla = document.getElementById("plantilla2");
  const clon = plantilla.content.cloneNode(true);

  clon.querySelector("h3").textContent = titulo;
  clon.querySelector("p").textContent = parrafo;

  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCards2() {
  try {
    // CAMBIO 1: "/" al inicio
    const respuesta = await fetch("/api/ml/casos"); 
    const datos = await respuesta.json();

    // CAMBIO 2: Usamos 'datos' directo. Quitamos '.items2'
    datos.forEach(item => { 
      crearCar2(item.titulo, item.parrafo, "casosDeUso");
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarCards2);
/*------------------------------------Fin Para casos de usos----------------------------------*/

/*---------------------------------------Para Ventajas y Desventajas---------------------------------*/
function crearCardVentDes(titulo, lista, contenedorId) {
  const plantilla = document.getElementById("plantilla3");
  const clon = plantilla.content.cloneNode(true);

  clon.querySelector("h3").textContent = titulo;

  const liTags = clon.querySelectorAll("li");
  liTags.forEach((li, i) => {
    li.textContent = lista[i] || ""; 
  });

  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCardsVentDes() {
  try {
    // CAMBIO 1: "/" al inicio
    const respuesta = await fetch("/api/ml/ventajas"); 
    const datos = await respuesta.json();

    // CAMBIO 2: Usamos 'datos' directo. Quitamos '.items3'
    datos.forEach(item => {
      crearCardVentDes(item.titulo, item.lista, "VentDes");
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarCardsVentDes);
/*---------------------------------------Fin Para Ventajas y Desventajas--------------------------- */