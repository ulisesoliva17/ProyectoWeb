/*function crearCardCNN(item, contenedorId) {
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
    const respuesta = await fetch("../jsons/dl.json");
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
document.addEventListener("DOMContentLoaded", cargarCardsCNN);*/
function revealOnScrollAnimate() {
  const elementos = document.querySelectorAll(".modelos-cajas, #Ind,#area-card, .modelos-cajas > article, #ventajas, #modelos-h2, #descripcion-h2, #areas-h2");
  const ventanaAltura = window.innerHeight;

  elementos.forEach((el, index) => {
    const elTop = el.getBoundingClientRect().top;

    if (elTop < ventanaAltura - 100 && !el.classList.contains("revelado")) {
      setTimeout(() => {
        el.style.opacity = 1;
        el.classList.add("animate__animated");
        //A medida que voy bajando por el scroll 
        if (el.classList.contains("area-card")) {
          el.classList.add("animate__animated", "animate__fadeInLeft");
          el.classList.add("animate__zoomOutUp");
        } else if (el.id === "ventajas" || el.id === "modelos-h2" || el.id === "areas-h2") {
          el.classList.add("animate__fadeInLeft");
        } else if (el.id === "descripcion-h2" || el.id == "Ind") {
          el.classList.add("animate__heartBeat");
        }else if(el.classList.contains("modelos-cajas")){
          el.classList.add("animate__fadeInLeft");
        } else {
          el.classList.add("animate__fadeInUp"); //hace que aparezcan de abajo. 
        }

        el.classList.add("revelado");
      }, index * 20);
    }

  });
} 






function crearCardCNN(item) {
  const plantilla = document.getElementById("modelosPrincipalesDP");
  const clon = plantilla.content.cloneNode(true);

  const enlace = clon.querySelector("a");
  enlace.href = item.link;
  enlace.textContent = item.nombre;

  const spans = clon.querySelectorAll("div > div > span");
  if (item.tags && item.tags.length >= 3) {
    spans[0].textContent = item.tags[0];
    spans[1].textContent = item.tags[1];
    spans[2].textContent = item.tags[2];
  }

  clon.querySelector("h2").textContent = item.titulo;

  const pTags = clon.querySelectorAll("p");
  pTags[0].textContent = item.subtitulo || "";
  pTags[1].textContent = item.descripcion || "";

  const article = clon.querySelector("article");
  if (article) {
    article.classList.add("animate__animated");
    article.style.opacity = 0;

    // Hover con zoom
    article.addEventListener("mouseenter", () => {
      article.style.transform = "scale(1.05)";
      article.style.transition = "transform 0.3s ease";
    });
    article.addEventListener("mouseleave", () => {
      article.style.transform = "scale(1)";
    });
  }

  return clon;
}

async function cargarCardsCNN() {
  try {
    // Carga el JSON
    const respuesta = await fetch("../jsons/dl.json");
    const datos = await respuesta.json();

    // Obtiene el contenedor
    const contenedor = document.getElementById("contenedorModeloPrincipal");
    if (!contenedor) {
      console.warn(`No existe el contenedor con id "contenedorModeloPrincipal"`);
      return;
    }

    // Recorre los items y agrega las cards
    datos.items.forEach(item => {
      const card = crearCardCNN(item);
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar las tarjetas CNN:", error);
  }
}

function parallaxBackground() {
  document.body.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
}




// Espera a que el DOM esté cargado
//document.addEventListener("DOMContentLoaded", cargarCardsCNN);
document.addEventListener("DOMContentLoaded", () => {
 // animateTextByLetter("dl-h1");
 // animateTextByLetter("ventajas");

  cargarCardsCNN();
  revealOnScrollAnimate();

  window.addEventListener("scroll", () => {
    revealOnScrollAnimate();
    parallaxBackground();
  });
});