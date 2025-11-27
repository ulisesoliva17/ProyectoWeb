// ===============================================
// dl.js — Carga de tarjetas y animaciones de scroll
// ===============================================

// Espera a que el DOM esté cargado y, cuando eso ocurra, llama a cargarCardsCNN.
// (Esta línea registra un listener para DOMContentLoaded.)
// Nota: el "*/" al final cierra un bloque de comentario previo en tu archivo.

// -----------------------------------------------
// Función: revealOnScrollAnimate
// Recorre un conjunto de elementos y, cuando entran
// al viewport (con cierto margen), les aplica clases
// de Animate.css para animarlos una sola vez.
// -----------------------------------------------
function revealOnScrollAnimate() {
  // Selecciona los elementos que querés animar al hacer scroll
  const elementos = document.querySelectorAll(
    ".modelos-cajas, #Ind,#area-card, .modelos-cajas > article, #ventajas, #modelos-h2, #descripcion-h2, #areas-h2"
  );

  // Altura visible de la ventana para calcular cuándo un elemento es “revelable”
  const ventanaAltura = window.innerHeight;

  elementos.forEach((el, index) => {
    // Posición del elemento relativa a la ventana
    const elTop = el.getBoundingClientRect().top;

    // Si el elemento está lo suficientemente arriba y aún no fue revelado...
    if (elTop < ventanaAltura - 100 && !el.classList.contains("revelado")) {
      // Se retrasa levemente cada animación para un efecto escalonado
      setTimeout(() => {
        // Hace visible el elemento
        el.style.opacity = 1;

        // Asegura la clase base de animate.css
        el.classList.add("animate__animated");

        // Decide qué animación aplicar según el tipo/ID/clase del elemento
        // (esto permite diferentes efectos para diferentes secciones)
        if (el.classList.contains("area-card")) {
          el.classList.add("animate__animated", "animate__fadeInLeft");
          el.classList.add("animate__zoomOutUp");
        } else if (el.id === "ventajas" || el.id === "modelos-h2" || el.id === "areas-h2") {
          el.classList.add("animate__fadeInLeft");
        } else if (el.id === "descripcion-h2" || el.id == "Ind") {
          el.classList.add("animate__heartBeat");
        } else if (el.classList.contains("modelos-cajas")) {
          el.classList.add("animate__fadeInLeft");
        } else {
          // Animación por defecto si no entra en ningún caso anterior
          el.classList.add("animate__fadeInUp"); // hace que aparezcan desde abajo
        }

        // Marca el elemento como ya revelado para no repetir la animación
        el.classList.add("revelado");
      }, index * 20); // 20ms por elemento para el efecto “en cascada”
    }
  });
}

// -----------------------------------------------
// Función: crearCardCNN(item)
// Clona un <template> del DOM, completa sus campos
// con los datos del item recibido y devuelve el clon.
// -----------------------------------------------
function crearCardCNN(item) {
  // Obtiene el <template> por ID
  const plantilla = document.getElementById("modelosPrincipalesDP");

  // Clona el contenido del template (true = clon profundo)
  const clon = plantilla.content.cloneNode(true);

  // Referencia al enlace principal de la card y lo completa
  const enlace = clon.querySelector("a");
  enlace.href = item.link;
  enlace.textContent = item.nombre;

  // Coloca hasta 3 tags en los <span> esperados dentro de la card
  const spans = clon.querySelectorAll("div > div > span");
  if (item.tags && item.tags.length >= 3) {
    spans[0].textContent = item.tags[0];
    spans[1].textContent = item.tags[1];
    spans[2].textContent = item.tags[2];
  }

  // Título principal de la card
  clon.querySelector("h2").textContent = item.titulo;

  // Par de párrafos: subtítulo y descripción (si hay)
  const pTags = clon.querySelectorAll("p");
  pTags[0].textContent = item.subtitulo || "";
  pTags[1].textContent = item.descripcion || "";

  // Ajustes visuales y hover sobre el <article> (contenedor de la card)
  const article = clon.querySelector("article");
  if (article) {
    // Clase base para animaciones y opacidad inicial 0 (se revelará luego)
    article.classList.add("animate__animated");
    article.style.opacity = 0;

    // Efecto zoom on hover (entrada/salida)
    article.addEventListener("mouseenter", () => {
      article.style.transform = "scale(1.05)";
      article.style.transition = "transform 0.3s ease";
    });
    article.addEventListener("mouseleave", () => {
      article.style.transform = "scale(1)";
    });
  }

  // Devuelve el DocumentFragment clonado y completado
  return clon;
}

// -----------------------------------------------
// Función: cargarCardsCNN()
// Pide datos al backend (/api/dl), itera items y
// va agregando cada card al contenedor principal.
// -----------------------------------------------
async function cargarCardsCNN() {
  try {
    // Llamada al endpoint REST que devuelve el JSON
    const respuesta = await fetch("/api/dl"); //Le hace la petición GET al endpoint /api/dl del servidor

    // Parseo de la respuesta como JSON
    const datos = await respuesta.json(); //Convierte la respuesta en un objeto JavaScript.

    // Contenedor donde se inyectarán las cards
    const contenedor = document.getElementById("contenedorModeloPrincipal");
    if (!contenedor) {
      console.warn('No existe el contenedor con id "contenedorModeloPrincipal"');
      return;
    }

    // Por cada item del JSON, crear la card y anexarla al DOM
    datos.items.forEach(item => {
      const card = crearCardCNN(item);
      contenedor.appendChild(card);
    });
  } catch (error) {
    // Log en consola por si la carga falla
    console.error("Error al cargar las tarjetas CNN:", error);
  }
}

// -----------------------------------------------
// Función: parallaxBackground()
// Mueve la posición vertical del background del <body>
// en función del scroll para dar efecto parallax simple.
// -----------------------------------------------
function parallaxBackground() {
  document.body.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
}

// -----------------------------------------------
// Registro de listeners al cargar el DOM:
// - Carga inicial de cards
// - Primer chequeo de animaciones
// - Listeners de scroll para animaciones y parallax
// -----------------------------------------------

// document.addEventListener("DOMContentLoaded", cargarCardsCNN);
document.addEventListener("DOMContentLoaded", () => {
  // Llamadas opcionales a animaciones de texto (comentadas en tu código)
  // animateTextByLetter("dl-h1");
  // animateTextByLetter("ventajas");

  // Carga de cards desde el backend
  cargarCardsCNN();

  // Chequeo inicial de elementos visibles para animar
  revealOnScrollAnimate();

  // En cada scroll: re-evaluar animaciones y actualizar el parallax
  window.addEventListener("scroll", () => {
    revealOnScrollAnimate();
    parallaxBackground();
  });
});
