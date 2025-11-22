// Archivo: script.js

const container = document.querySelector('.imgSwap');
// Seleccionamos el video usando la clase .imgAlt que definimos en el HTML
const video = container.querySelector('.imgAlt'); 

// Evento al poner el mouse encima: Reproducir video
container.addEventListener('mouseenter', () => {
  video.play(); 
});

// Evento al sacar el mouse: Pausar y reiniciar
container.addEventListener('mouseleave', () => {
  video.pause(); 
  video.currentTime = 0; // Vuelve al inicio para la próxima vez
});