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

