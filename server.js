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
});
