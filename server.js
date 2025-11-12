/*
// ===============================================
// server.js — Servidor Express básico con endpoint REST
// ===============================================

// Importa los módulos necesarios de Node.js
const express = require("express");  // Framework para crear el servidor web
const path = require("path");        // Módulo para manejar rutas de archivos
const fs = require("fs");            // Módulo del sistema de archivos (para leer el JSON)

// Crea una aplicación Express
const app = express();

// Define el puerto: usa el que esté en las variables de entorno o, si no hay, el 3000
const PORT = process.env.PORT || 3000;

// Define la raíz del proyecto (la carpeta donde está este archivo)
const ROOT = __dirname;

// -----------------------------------------------
// Middleware para servir archivos estáticos
// Esto permite acceder a archivos del proyecto (HTML, CSS, JS, imágenes, etc.)
// directamente desde el navegador.
// Ejemplo: http://localhost:3000/estilos.css
// -----------------------------------------------
app.use(express.static(ROOT));

// -----------------------------------------------
// Endpoint REST: /api/dl
// Devuelve el contenido del archivo "jsons/dl.json" como respuesta JSON.
// Este es el punto donde el frontend (dl.js) hace fetch("/api/dl").
// -----------------------------------------------
app.get("/api/dl", (req, res) => {
  // Construye la ruta absoluta del archivo JSON
  const jsonPath = path.join(ROOT, "jsons", "dl.json");

  // Lee el archivo de forma asíncrona
  fs.readFile(jsonPath, "utf8", (err, data) => {
    // Si ocurre un error al leer, se muestra en consola y se responde con código 500 (error del servidor)
    if (err) {
      console.error("Error al leer el JSON:", err);
      return res.status(500).json({ error: "Error al leer el archivo JSON" });
    }

    // Si todo va bien, se parsea el contenido (de texto a objeto) y se envía como respuesta JSON
    res.json(JSON.parse(data));
  });
});

// -----------------------------------------------
// Ruta raíz: /
// Cuando el usuario accede al dominio base (localhost:3000),
// se envía el archivo index.html al navegador.
// -----------------------------------------------
app.get("/", (_req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

// -----------------------------------------------
// Iniciar el servidor
// Hace que la aplicación empiece a "escuchar" peticiones en el puerto definido.
// Cuando se inicia correctamente, muestra un mensaje en la consola.
// -----------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});*/
// ===============================================
// server.js — API REST completa con Express
// ===============================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const JSON_PATH = path.join(ROOT, "jsons", "dl.json");

// Middleware
app.use(express.static(ROOT));
app.use(express.json()); // Para leer JSON del body

// Helper para leer el JSON
function leerJSON() {
  return JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
}

// Helper para escribir el JSON
function escribirJSON(data) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
}

// ===============================================
// GET /api/dl → obtiene todos los modelos
// ===============================================
app.get("/api/dl", (req, res) => {  //Define la ruta 
  try {
    const data = leerJSON();  // Lee archivo y lo convertimos en objeto 
    res.json(data);           // devuelvo el contenido 
  } catch (err) {
    console.error("Error al leer el JSON:", err);   //muestra el error
    res.status(500).json({ error: "No se pudo leer el archivo JSON" }); // error 500 si algo falla
  }
});

// ===============================================
// GET /api/dl/pos/:index → buscar por posición
// ===============================================
app.get("/api/dl/pos/:index", (req, res) => {  //definimos ruta get con un paremetro ( index)
  try {
    const data = leerJSON();
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= data.items.length) { //verificamos si el index es valido 
      return res.status(400).json({ error: "Índice fuera de rango o inválido" }); // si el index no es valido error 400
    }

    res.json(data.items[index]); // nos devuelve el modelo que esta en esa posicion
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar por posición" });
  }
});

// ===============================================
// POST /api/dl → agrega un nuevo modelo
// ===============================================
app.post("/api/dl", (req, res) => {
  try {
    const data = leerJSON(); // lee el archivo json que tenemos
    const nuevo = req.body; // tomamos los datos de la solicitud 

    if (!nuevo.nombre || !nuevo.titulo) { //campos que pusimos como obligatorios (tambien podriamos poner todos los campos) 
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, titulo)" });
    }

    data.items.push(nuevo);  //agrega el nuevo modelo al json
    escribirJSON(data); // actualiza el archivo

    res.status(201).json({ mensaje: "Modelo agregado con éxito", nuevo }); //devuelve mensaje de que se pudo guardar 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo guardar el nuevo modelo" });
  }
});

// ===============================================
// PUT /api/dl/:nombre → actualiza un modelo por nombre
// ===============================================
app.put("/api/dl/:nombre", (req, res) => {
  try {
    const data = leerJSON(); //lee el json 
    const nombre = req.params.nombre;  // toma el nombre del modelo 
    const index = data.items.findIndex(item => item.nombre === nombre); // busca la posicion del modelo en el array de items de json

    if (index === -1) {
      return res.status(404).json({ error: "Modelo no encontrado" }); // sino no exite
    }

    data.items[index] = { ...data.items[index], ...req.body }; // actualiza
    escribirJSON(data); // guarda en json 

    res.json({ mensaje: "Modelo actualizado", actualizado: data.items[index] }); // devuelve lo modificado 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar el modelo" });
  }
});

// ===============================================
// DELETE /api/dl/:nombre → elimina un modelo por nombre
// ===============================================
app.delete("/api/dl/:nombre", (req, res) => {
  try {
    const data = leerJSON();
    const nombre = req.params.nombre;
    const nuevoArray = data.items.filter(item => item.nombre !== nombre); //crea un nuevo arrays sin el modelo

    if (nuevoArray.length === data.items.length) { // si no se elimino el modelo, entonces no lo encontro
      return res.status(404).json({ error: "Modelo no encontrado" });
    }

    escribirJSON({ items: nuevoArray }); //escribe el nuevo json 
    res.json({ mensaje: "Modelo eliminado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar el modelo" });
  }
});

// ===============================================
// Ruta raíz: / → devuelve index.html
// ===============================================
app.get("/", (_req, res) => {   //definimos la ruta de servidor
  res.sendFile(path.join(ROOT, "index.html")); // envia el archivo 
});

// ===============================================
// Iniciar el servidor
// ===============================================
app.listen(PORT, () => {  //Inicia el servidor Express
  console.log(`Servidor listo en http://localhost:${PORT}`); //Mostramos el mensaje de inicio. 
});
