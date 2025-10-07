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
