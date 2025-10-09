function crearCardCNN(item, contenedorId) {
  // Obtiene la plantilla del HTML
  const plantilla = document.getElementById("modelosPrincipalesDP");
  const clon = plantilla.content.cloneNode(true);

  // Asigna el enlace principal (nombre y link)
  const enlace = clon.querySelector("a");
  enlace.href = item.link;
  enlace.textContent = item.nombre;

  // Asigna los tags (Visión, Clasificación, etc.)
  const spans = clon.querySelectorAll("div > div > span");
  if (item.tags && item.tags.length >= 3) {
    spans[0].textContent = item.tags[0];
    spans[1].textContent = item.tags[1];
    spans[2].textContent = item.tags[2];
  }

  // Asigna el título principal (h2)
  clon.querySelector("h2").textContent = item.titulo;

  // Asigna los párrafos (subtítulo y descripción)
  const pTags = clon.querySelectorAll("p");
  pTags[0].textContent = item.subtitulo || "";
  pTags[1].textContent = item.descripcion || "";

  // Inserta el clon en el contenedor indicado
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.appendChild(clon);
  } else {
    console.warn(`No existe el contenedor con id "${contenedorId}"`);
  }
}

async function cargarCardsCNN() {
  try {
    // Carga el JSON
    const respuesta = await fetch("../jsons/dl.json"); // ajustá la ruta si hace falta
    const datos = await respuesta.json();

    // Recorre los items dentro del JSON y crea las cards
    datos.items.forEach(item => {
      crearCardCNN(item, "contenedorModeloPrincipal"); // "redesNeuronales" es el id del contenedor
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas CNN:", error);
  }
}

// Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", cargarCardsCNN);