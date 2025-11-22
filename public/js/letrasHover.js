// Genera un <span> por cada letra del h2, conservando los espacios
// Selecciona todos los elementos con la clase 'titulosHovers'
const titulos = document.querySelectorAll('.titulosHovers');

titulos.forEach(titulo => {
  titulo.innerHTML = titulo.textContent
    .split('')
    .map(letra => {
      // si la letra es un espacio, devolvés el espacio sin envolver
      if (letra === ' ') return ' ';
      return `<span>${letra}</span>`;
    })
    .join('');
});