// server.js (CommonJS)
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname; // carpeta ProyectoWeb

// Servir estáticos: tu estructura actual (css, js, html, jsons, Imagenes, icons, scss)
app.use(express.static(ROOT));

// Ruta raíz: entregar index.html
app.get("/", (_req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});